class Modal extends HTMLElement {
  /**
   * Constructor for creating a new Modal instance.
   */
  public constructor() {
    super();

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
            <button>Cancel</button>
            <button>Confirm</button>
          </section>
        </div>
      `;
    }
  }
}

// Define the custom element "wc-modal" ("wc" stands for Web Component) and associate it with the Modal class.
customElements.define("wc-modal", Modal);
