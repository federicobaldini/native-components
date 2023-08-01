/**
 * Represents a custom tooltip element that displays additional information when hovered over.
 */
class Tooltip extends HTMLElement {
  /**
   * Constructor for creating a new Tooltip instance.
   */
  constructor() {
    super();
  }

  /**
   * Called when the element is inserted into the DOM.
   * It creates a tooltip icon and appends it to the element.
   */
  connectedCallback(): void {
    // Create a <span> element to serve as the tooltip icon.
    const tooltipIcon: HTMLElement = document.createElement("span");

    // Set the text content of the tooltip icon to "(?)".
    tooltipIcon.textContent = "(?)";

    // Append the tooltip icon to the custom tooltip element.
    this.appendChild(tooltipIcon);
  }
}

// Define the custom element "wc-tooltip" ("wc" stands for Web Component) and associate it with the Tooltip class.
customElements.define("wc-tooltip", Tooltip);
