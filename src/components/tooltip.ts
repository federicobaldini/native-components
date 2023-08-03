/**
 * Represents a custom tooltip element that displays additional information when hovered over.
 */
class Tooltip extends HTMLElement {
  private tooltipIcon: HTMLElement | null;
  private tooltipContainer: HTMLElement | null;

  /**
   * Constructor for creating a new Tooltip instance.
   */
  public constructor() {
    super();
    this.tooltipIcon = null;
    this.tooltipContainer = null;
  }

  /**
   * Event handler to show the tooltip.
   */
  private showTooltipHandler(): void {
    // Create a <div> element to serve as the tooltip container.
    this.tooltipContainer = document.createElement("div");

    // Set the text content of the tooltip container to display the tooltip message.
    this.tooltipContainer.textContent = "This is the tooltip text!";

    // Append the tooltip container to the custom tooltip element.
    this.appendChild(this.tooltipContainer);
  }

  /**
   * Event handler to hide the tooltip.
   */
  private hideTooltipHandler(): void {
    // Check if tooltipContainer exists before removing it from the DOM.
    if (this.tooltipContainer) {
      // Remove the tooltip container from the custom tooltip element.
      this.removeChild(this.tooltipContainer as Node);
    }
  }

  /**
   * Called when the element is inserted into the DOM.
   * It creates a tooltip icon and appends it to the element.
   */
  public connectedCallback(): void {
    // Create a <span> element to serve as the tooltip icon.
    this.tooltipIcon = document.createElement("span");

    // Set the text content of the tooltip icon to "(?)".
    this.tooltipIcon.textContent = "(?)";

    // Add event listeners to show/hide tooltip on mouseenter/mouseleave.
    this.tooltipIcon.addEventListener(
      "mouseenter",
      this.showTooltipHandler.bind(this)
    );
    this.tooltipIcon.addEventListener(
      "mouseleave",
      this.hideTooltipHandler.bind(this)
    );

    // Append the tooltip icon to the custom tooltip element.
    this.appendChild(this.tooltipIcon);
  }

  /**
   * Called when the element is removed from the DOM.
   * It removes the event listeners to avoid potential memory leaks.
   */
  public disconnectedCallback(): void {
    // Check if tooltipIcon exists before removing event listeners.
    if (this.tooltipIcon) {
      // Remove event listeners for mouseenter and mouseleave.
      this.tooltipIcon.removeEventListener(
        "mouseenter",
        this.showTooltipHandler.bind(this)
      );
      this.tooltipIcon.removeEventListener(
        "mouseleave",
        this.hideTooltipHandler.bind(this)
      );
    }
  }
}

// Define the custom element "wc-tooltip" ("wc" stands for Web Component) and associate it with the Tooltip class.
customElements.define("wc-tooltip", Tooltip);
