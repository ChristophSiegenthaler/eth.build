function Round() {
        this.addInput("A", "number");
        this.addProperty("A", 1);
        this.addOutput("value", "number");
        this.size = [200, 30];
    }

    Round.title = "Round";
    Round.desc = "Round to next int";

    Round.prototype.onAction = function() {
        this.properties.automatic = false
        this.v = Math.round();
    }

    Round.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.outputs[0].label =  Math.floor(this.v || 0);
    };

    Round.prototype.onGetInputs = function() {
        return [["min", "number"], ["max", "number"]];
    };

export default Round
