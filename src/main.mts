
export type HTMLElementType = HTMLElementWrapper | HTMLElement;

export class HTMLElementSaver {
    private element: HTMLElementWrapper | null;

    public constructor(element: HTMLElementWrapper | null) {
        this.element = element;
    }

    public set(element: HTMLElementWrapper | null): void {
        this.element = element;
    }

    public get(): HTMLElementWrapper | never {
        if(this.element === null) {
            throw "no element set";
        } else {
            return this.element;
        }
    }
}

export class HTMLElementWrapper {
    private element: HTMLElement;

    public constructor(element: HTMLElementType) {
        this.element = dc.getElement(element);
    }

    public id(value: string): HTMLElementWrapper {
        this.element.id = value;
        return this;
    }

    public text(value: string): HTMLElementWrapper {
        this.element.innerText = value;
        return this;
    }

    public appendTo(element: HTMLElementType): HTMLElementWrapper {
        dc.getElement(element).appendChild(this.element);
        return this;
    }

    public parent(): HTMLElementWrapper | never {
        if (this.element.parentElement === null){
            throw new Error('no parent available');
        }
        return new HTMLElementWrapper(this.element.parentElement);
    }

    public append(...args: HTMLElementType[]): HTMLElementWrapper {
        args.forEach(element => this.element.appendChild(dc.getElement(element)), this);
        return this;
    }

    public child(element: HTMLElementType): HTMLElementWrapper {
        this.element.appendChild(dc.getElement(element));
        return new HTMLElementWrapper(dc.getElement(element));
    }
    
    public event(type: string, listener: EventListenerOrEventListenerObject): HTMLElementWrapper {
        this.element.addEventListener(type, listener);
        return this;
    }
    
    public click(listener: EventListenerOrEventListenerObject): HTMLElementWrapper {
        return this.event("click", listener);
    }
    
    public attribute(name: string, value: string): HTMLElementWrapper {
        this.element.setAttribute(name, value);
        return this;
    }

    public a(name: string, value: string): HTMLElementWrapper {
        return this.attribute(name, value);
    }    

    public name(value: string): HTMLElementWrapper {
        return this.attribute("name", value);
    }    

    public class(...tokens: string[]): HTMLElementWrapper {
        this.element.classList.add(...tokens);
        return this;
    }

    public get(): HTMLElement {
        return this.element;
    }

    public save(target: HTMLElementSaver): HTMLElementWrapper {
        target.set(this);
        return this;
    }
}

export const dc = {
    h1(): HTMLElementWrapper {
        return this.create("h1");
    },
    div(): HTMLElementWrapper {
        return this.create("div");
    },
    create(name: string): HTMLElementWrapper {
        return this.wrap(document.createElement(name));
    },
    c(name: string): HTMLElementWrapper {
        return this.create(name);
    },
    wrap(element: HTMLElementType): HTMLElementWrapper {
        return new HTMLElementWrapper(element);
    },
    id(id: string): HTMLElementWrapper | never {
        const element: HTMLElement | null = document.getElementById(id);
        if (element === null) {
            throw new Error('id not found');
        } else {
            return this.wrap(element);
        }
    },
    saver(): HTMLElementSaver {
        return new HTMLElementSaver(null);
    },
    getElement(element: HTMLElementType): HTMLElement | never {
        if (element instanceof HTMLElementWrapper) {
            return element.get();
        } else if (element instanceof HTMLElement) {
            return element;
        } else {
            throw new Error('element is not of HTMLElementType');
        }
    }
};
