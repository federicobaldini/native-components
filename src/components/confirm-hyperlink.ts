class ConfirmHyperlink extends HTMLAnchorElement {
  public constructor() {
    super();
  }

  private clickHandler = (event: MouseEvent): void => {
    if (!confirm("Do you really want to leave?")) {
      event.preventDefault();
    }
  };

  public connectedCallback(): void {
    this.addEventListener("click", this.clickHandler);
  }

  public disconnectedCallback(): void {
    this.removeEventListener("click", this.clickHandler);
  }
}

customElements.define("wc-confirm-hyperlink", ConfirmHyperlink, {
  extends: "a",
});
