exports.register = (snip_area, cb)=> {
    let elements = [];
    if(!isElement(snip_area)) {
        try {
            for(let el of snip_area) {
                if(isElement(el)) {
                    elements.push(el)
                }
            }
        }
        catch {
            console.error("Unable to register elements")
        }
    }
    else {
        elements.push(snip_area)
    }
    console.log(`Got ${elements.length} ${elements.length === 1 ? 'element' : 'elements'} to be registered as snip area`);

    for(let el of elements) {
        new Snippable(el, cb)
    }
};

class Snippable {
    constructor(element, callback) {
        element.setAttribute('draggable', false);
        this.canvas = install_canvas(element);

        this.dragging = false;
        this.drag_start = {};
        this.drag_end = {};

        this.canvas.addEventListener('click', this.element_click.bind(this));
        this.canvas.addEventListener('mousemove', this.element_refresh.bind(this));

        this.callback = callback;
    }

    element_click(e) {
        if(!this.dragging) {
            this.dragging = true;
            this.clear_canvas();
            this.drag_start = get_target_coords(e);
            this.drag_start_relative = get_relative_coords(e);
        }
        else {
            this.dragging = false;
            this.drag_end = get_target_coords(e);
            this.drag_end_relative = get_relative_coords(e);
            this.draw_rect();
            this.callback(this.drag_start_relative, this.drag_end_relative)
        }
    }

    element_refresh(e) {
        if(this.dragging) {
            let c = e.target;
            this.drag_end = get_target_coords(e);
            this.draw_rect();
        }
    }

    clear_canvas() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw_rect() {
        this.clear_canvas();
        let ctx = this.canvas.getContext("2d");
        ctx.strokeRect(this.drag_start.x, this.drag_start.y, this.drag_end.x - this.drag_start.x, this.drag_end.y - this.drag_start.y);
    }
}

function install_canvas(element) {
    let body = document.getElementsByTagName("body")[0];
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = `${element.y}px`;
    canvas.style.left = `${element.x}px`;
    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;
    body.appendChild(canvas);
    return canvas;
}

function get_target_coords(e) {
    return {
        x: e.clientX - parseInt(e.target.style.left.replace("px", "")),
        y: e.clientY - parseInt(e.target.style.top.replace("px", ""))
    }
}

function get_relative_coords(e) {
    let abs_coords = get_target_coords(e);
    return {
        x: abs_coords.x / e.target.width,
        y: abs_coords.y / e.target.height
    }
}


//Returns true if it is a DOM node
// https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}

//Returns true if it is a DOM element
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && true && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}