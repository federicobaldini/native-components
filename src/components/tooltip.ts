/**
 * Represents a custom tooltip element that displays additional information when hovered.
 */
class Tooltip extends HTMLElement {
  private iconElement: HTMLElement | null;
  private containerElement: HTMLElement | null;
  private text: string;

  /**
   * Constructor for creating a new Tooltip instance.
   */
  public constructor() {
    super();
    this.iconElement = null;
    this.containerElement = null;
    this.text = "";

    // Create and attach a shadow DOM to the custom tooltip element.
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      // Set the initial shadow DOM content with inline styles and a slot for the outside content.
      this.shadowRoot.innerHTML = `
        <style>
          div {
            font-weight: normal;
            max-width: 100px;
            background: #000000;
            color: #ffffff;
            position: absolute;
            top: 32px;
            right: 0;
            z-index: 10;
            padding: 4px 8px;
            border-radius: 8px;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
          }

          :host {
            position: relative;
            background: var(--color-primary, #cccccc);
            padding: 8px;
            border-radius: 8px;
          }

          :host-context(p) {
            font-weight: bold;
          }

          ::slotted() {
            border-bottom: 1px solid #ff0000;
          }
          
          .icon {
            background: #000000;
            color: #ffffff;
            padding: 2px 7px;
            text-align: center;
            border-radius: 50%;
          }
        </style>
        <slot>default</slot>
        <span class="icon">?</span>
      `;
    }
  }

  /**
   * Event handler to show the tooltip.
   */
  private showTooltipHandler(): void {
    // Create a <div> element to serve as the tooltip container.
    this.containerElement = document.createElement("div");

    // Set the text content of the tooltip container to display the tooltip message.
    this.containerElement.textContent = this.text;

    if (this.shadowRoot) {
      // Append the tooltip container to the custom tooltip element's shadow DOM.
      this.shadowRoot.appendChild(this.containerElement);
    }
  }

  /**
   * Event handler to hide the tooltip.
   */
  private hideTooltipHandler(): void {
    if (this.containerElement && this.shadowRoot) {
      // Remove the tooltip container from the custom tooltip element's shadow DOM.
      this.shadowRoot.removeChild(this.containerElement as Node);
    }
  }

  /**
   * Called when the element is inserted into the DOM.
   * It creates a tooltip icon and appends it to the element.
   * Retrieves and stores the "text" attribute if present.
   */
  public connectedCallback(): void {
    // Check if the custom tooltip element has the "text" attribute.
    if (this.hasAttribute("text")) {
      // Get the tooltip text from the "text" attribute and store it in the "text" property.
      this.text = this.getAttribute("text") as string;
    }

    if (this.shadowRoot) {
      // Get the reference to the tooltip icon (span) within the custom tooltip element's shadow DOM.
      this.iconElement = this.shadowRoot.querySelector("span");

      if (this.iconElement) {
        // Add event listeners to show/hide tooltip on mouseenter/mouseleave.
        this.iconElement.addEventListener(
          "mouseenter",
          this.showTooltipHandler.bind(this)
        );
        this.iconElement.addEventListener(
          "mouseleave",
          this.hideTooltipHandler.bind(this)
        );
      }
    }
  }

  /**
   * Called when the element is removed from the DOM.
   * It removes the event listeners to avoid potential memory leaks.
   */
  public disconnectedCallback(): void {
    // Check if iconElement exists before removing event listeners.
    if (this.iconElement) {
      // Remove event listeners for mouseenter and mouseleave.
      this.iconElement.removeEventListener(
        "mouseenter",
        this.showTooltipHandler.bind(this)
      );
      this.iconElement.removeEventListener(
        "mouseleave",
        this.hideTooltipHandler.bind(this)
      );
    }
  }

  public static get observedAttributes(): Array<string> {
    return ["text"];
  }

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any
  ): void {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case "text":
        this.text = newValue;
        break;
      default:
        break;
    }
  }
}

// Define the custom element "wc-tooltip" ("wc" stands for Web Component) and associate it with the Tooltip class.
customElements.define("wc-tooltip", Tooltip);
