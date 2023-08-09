/**
 * Represents a custom modal element that displays a dialog box for confirmation.
 */
class Modal extends HTMLElement {
  private backdropElement: HTMLElement | null;
  private modalElement: HTMLElement | null;
  private cancelButton: HTMLButtonElement | null;
  private confirmButton: HTMLButtonElement | null;
  private isOpen: boolean;

  /**
   * Constructor for creating a new Modal instance.
   */
  public constructor() {
    super();
    this.backdropElement = null;
    this.modalElement = null;
    this.cancelButton = null;
    this.confirmButton = null;
    this.isOpen = false;

    // Create and attach a shadow DOM to the custom modal element.
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      // Set the initial shadow DOM content with inline styles and a slot for the outside content.
      this.shadowRoot.innerHTML = `
        <style>
          #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2;
            opacity: 0;
            pointer-events: none;
          }

          #modal {
            position: fixed;
            top: 15vh;
            left: 25%;
            width: 50%;
            max-height: 480px;
            z-index: 3;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: auto;
            opacity: 0;
            pointer-events: none;
          }

          header {
            padding: 16px;
          }

          header h1 {
            margin: 0;
            font-size: 24px;
          }

          #main {
            padding: 16px;
          }

          #actions {
            border-top: 1px solid #cccccc;
            padding: 16px;
            display: flex;
            justify-content: flex-end;
          }

          #actions button {
            margin: 0 8px;
          }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
          <header>
            <h1>Please Confirm</h1>
          </header>
          <section id="main">
            <slot></slot>
          </section>
          <section id="actions">
            <button id="cancel-button">Cancel</button>
            <button id="confirm-button">Confirm</button>
          </section>
        </div>
      `;
    }
  }

  /**
   * Event handler to show the modal.
   */
  private showModalHandler(): void {
    if (this.backdropElement && this.modalElement) {
      this.isOpen = true;

      // Update styles to make the modal and backdrop visible and interactive.
      this.backdropElement.style.opacity = "1";
      this.backdropElement.style.pointerEvents = "all";
      this.modalElement.style.opacity = "1";
      this.modalElement.style.pointerEvents = "all";
    }
  }

  /**
   * Event handler to hide the modal.
   */
  private hideModalHandler(): void {
    if (this.backdropElement && this.modalElement) {
      this.isOpen = false;

      // Update styles to hide the modal and backdrop.
      this.backdropElement.style.opacity = "0";
      this.backdropElement.style.pointerEvents = "none";
      this.modalElement.style.opacity = "0";
      this.modalElement.style.pointerEvents = "none";
    }
  }

  /**
   * Called when the element is inserted into the DOM.
   * Sets up event listeners for buttons and initializes element references.
   */
  public connectedCallback(): void {
    if (this.shadowRoot) {
      // Get references to elements within the shadow DOM.
      this.backdropElement = this.shadowRoot.querySelector("#backdrop");
      this.modalElement = this.shadowRoot.querySelector("#modal");
      this.cancelButton = this.shadowRoot.querySelector("#cancel-button");
      this.confirmButton = this.shadowRoot.querySelector("#confirm-button");
    }

    // Add event listeners for buttons to hide the modal.
    if (this.cancelButton) {
      this.cancelButton.addEventListener(
        "click",
        this.hideModalHandler.bind(this)
      );
    }

    if (this.confirmButton) {
      this.confirmButton.addEventListener(
        "click",
        this.hideModalHandler.bind(this)
      );
    }
  }

  /**
   * Called when the element is removed from the DOM.
   * Removes event listeners to prevent memory leaks.
   */
  public disconnectedCallback(): void {
    if (this.cancelButton) {
      this.cancelButton.removeEventListener("click", this.hideModalHandler);
    }

    if (this.confirmButton) {
      this.confirmButton.removeEventListener("click", this.hideModalHandler);
    }
  }

  /**
   * Specifies the attributes to be observed for changes.
   * In this case, it observes changes to the "open" attribute.
   */
  public static get observedAttributes(): Array<string> {
    return ["open"];
  }

  /**
   * Called when the observed attributes change.
   * Updates the modal visibility based on the "open" attribute value.
   */
  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any
  ): void {
    switch (name) {
      case "open":
        if (newValue) {
          this.showModalHandler();
        } else {
          this.hideModalHandler();
        }
        break;
      default:
        break;
    }
  }
}

// Define the custom element "wc-modal" ("wc" stands for Web Component) and associate it with the Modal class.
customElements.define("wc-modal", Modal);
