# dragsnip
Plain JS tool for dragging bounding boxes on DOM elements.
Handy to retrieve the relative position of the bounding box on the element.

## Install
```npm install dragsnip```

## Usage
In your HTML code:
```html
<div>
    <img class="snippable" src="myImage.jpg" />
</div>
```

In your JS code:
```javascript
let dragsnip = require("dragsnip");

// select the DOM element you want to dragsnip on (yep, that's a verb as of now)
let snip_area = document.getElementsByClassName("snippable");

// For now only relative coordinates are being delivered to the callback
let cb = (start, end) => {
    console.log(`start: x: ${start.x} | y: ${start.y}`);
    console.log(`end: x: ${end.x} | y: ${end.y}`);
};

// register your DOM element alongside with your callback
dragsnip.register(snip_area, cb);

// Profit. Try to click and drag on your image
```

## Author
Made with &#9829;, pizza and beer by MaPa  
[![alt text][1.1]][1]
[![alt text][2.1]][2]
[![alt text][6.1]][6]

[1]: http://www.twitter.com/mxcd_
[2]: https://www.facebook.com/max.partenfelder
[6]: http://www.github.com/mxcd

[1.1]: http://i.imgur.com/tXSoThF.png (twitter icon with padding)
[2.1]: http://i.imgur.com/P3YfQoD.png (facebook icon with padding)
[6.1]: http://i.imgur.com/0o48UoR.png (github icon with padding)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->
