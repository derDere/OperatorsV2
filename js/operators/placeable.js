const AllPlaceables = []

class Placeable extends Operator {
    
    constructor(x = 0, y = 0) {
        super(x, y)

        this.label = 'Unknown'
        this.col = 0
        this.row = 0
        this.colSpan = 1
        this.rowSpan = 1
    }

    getEle(callback) { // cb is a string with a js function name that can be placed inside of a onChanged input event if the Placeable wants to receive user input
        // The result of this function should be a html string containing a single main element
        return '<div>None</div>'
    }

    eleChanged(newValue) {
        // Gets called from the element if the element is an input and th callback was properly integrated
    }
}

function createTableOfElements() {
    
}

function updatePlacableElements() {

}