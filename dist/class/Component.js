export class Component {
    constructor(TemplateID, HostID, ElementID) {
        this.templateElement = document.getElementById(TemplateID);
        this.hostElement = document.getElementById(HostID);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (ElementID) {
            this.element.id = ElementID;
        }
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
//# sourceMappingURL=Component.js.map