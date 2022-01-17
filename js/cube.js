var Color = { W : "W", Y : "Y", B : "B", G : "G", R : "R", O : "O" };
var Turn = { F : "f", B : "b", T : "t", U : "u", R : "r", L : "l", C : false, CC: true };
var edges = [1, 3, 5, 7], corners = [0, 2, 6, 8]; //4 is center
var changesC  = [6, 2, -2, 4], changesCC = [2, 4, 6, -2];
var allFaces = ["f", "b", "t", "u", "r", "l"];
var orderedSides = ["t", "r", "u", "l"];
var adjChanges = [ [ [6, 7, 8], [0, 3, 6], [2, 1, 0], [8, 5, 2] ], //f
                   [ [2, 1, 0], [0, 3, 6], [6, 7, 8], [8, 5, 2] ], //b
                   [ [2, 1, 0], [2, 1, 0], [2, 1, 0], [2, 1, 0] ], //t
                   [ [6, 7, 8], [6, 7, 8], [6, 7, 8], [6, 7, 8] ], //u
                   [ [8, 5, 2], [0, 3, 6], [8, 5, 2], [8, 5, 2] ], //r
                   [ [0, 3, 6], [0, 3, 6], [0, 3, 6], [8, 5, 2] ], //l
]; //rT, rR, rU, rL

function checkFace(face) {
    var c = face[4];
    for (var i = 1; i < 9; i++) {
        if (face[i] != c) { return false }
    }
    return true
}
    
function checkCube(cube) {
    for (var i = 0; i < 6; i++) {
        if (!checkFace(cube.full[i])) { return false }
    }
    return true
}

function checkerboard(cube) {
    cube.turnFace("l", Turn.C); cube.turnFace("l", Turn.C); 
    cube.turnFace("r", Turn.C); cube.turnFace("r", Turn.C);
    cube.turnFace("t", Turn.C); cube.turnFace("t", Turn.C);
    cube.turnFace("u", Turn.C); cube.turnFace("u", Turn.C);
    cube.turnFace("f", Turn.C); cube.turnFace("f", Turn.C);
    cube.turnFace("b", Turn.C); cube.turnFace("b", Turn.C);
    console.log(cube.toString(false));
    return cube
}

function testTurns(cube) {
    cube.turnFace("f", false);
    console.log(rubix.toString(false));
    cube.turnFace("f", true);
    console.log(rubix.toString(false));
    cube.turnFace("b", false);
    console.log(rubix.toString(false));
    cube.turnFace("b", true);
    console.log(rubix.toString(false));
    cube.turnFace("t", false);
    console.log(rubix.toString(false));
    cube.turnFace("t", true);
    console.log(rubix.toString(false));
    cube.turnFace("u", false);
    console.log(rubix.toString(false));
    cube.turnFace("u", true);
    console.log(rubix.toString(false));
    cube.turnFace("r", false);
    console.log(rubix.toString(false));
    cube.turnFace("r", true);
    console.log(rubix.toString(false));
    cube.turnFace("l", false);
    console.log(rubix.toString(false));
    cube.turnFace("l", true);
    console.log(rubix.toString(false));
    return cube
}

function printStep(side, counter, html) {
    if (!html) { //console
        console.log(side + (counter ? "'" : "") + " ");
    } else {
        document.write(side + (console ? "'" : "") + " ");
    }
}

function specialCube(cube) {
    cube.turnFace("r", false);
    cube.turnFace("l", false);
    cube.turnFace("u", false);
    cube.turnFace("t", false);
    cube.turnFace("r", false);
    cube.turnFace("l", false);
    cube.turnFace("u", false);
    cube.turnFace("t", false);
    cube.turnFace("u", false);
    cube.turnFace("t", false);
    return cube    
}

class Cube {

    constructor(a) { //where a is a 1d array
        this.full = a;
        this.f = a[0]; this.b = a[1];
        this.t = a[2]; this.u = a[3];
        this.r = a[4]; this.l = a[5];
        this.solved = checkCube(this);
        this.turns = 0;
    }

    turnFace(side, counter) { //turnFace function
        printStep(side, counter, true);
        var newFace, refFace;
        var relT, relU, relR, relL;
        var refT, refU, refR, refL;
        switch (side) {
            case "f":
                newFace = [...this.f]; refFace = this.f;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "b":
                newFace = [...this.b]; refFace = this.b;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.l]; refR = this.l; relL = [...this.r]; refL = this.r;
                break;
            case "t":
                newFace = [...this.t]; refFace = this.t;
                relT = [...this.b]; refT = this.b; relU = [...this.f]; refU = this.f;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "u":
                newFace = [...this.u]; refFace = this.u;
                relT = [...this.f]; refT = this.f; relU = [...this.b]; refU = this.b;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "r":
                newFace = [...this.r]; refFace = this.r;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.b]; refR = this.b; relL = [...this.f]; refL = this.f;
                break;
            case "l":
                newFace = [...this.l]; refFace = this.l;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.f]; refR = this.f; relL = [...this.b]; refL = this.b;
                break;
            default: console.log("Unknown Side: " + side);
        }
        for (var i = 0; i < 9; i++) {
            if (i == 4) { continue; }
            if (i < 4) {
                newFace[i] = refFace[i + (counter ? changesCC[i] : changesC[i])];
            } else {
                newFace[i] = refFace[i - (counter ? changesCC[8 - i] : changesC[8 - i])];
            }
        }
        //for side = l, change top 0/3/6, front 0/3/6, bot 0/3/6, back 2/5/8
        var refAdjChanges;
        switch (side) {
            case "f": refAdjChanges = 0; break;
            case "b": refAdjChanges = 1; break;
            case "t": refAdjChanges = 2; break;
            case "u": refAdjChanges = 3; break;
            case "r": refAdjChanges = 4; break;
            case "l": refAdjChanges = 5; break;
        }
        var ref2D = adjChanges[refAdjChanges];
        if (!counter) {
            for (var i = 0; i < 3; i++) { //0 = t, 1 = r, 2 = u, 3 = l
                relT[ref2D[0][i]] = refL[ref2D[3][i]];
                relR[ref2D[1][i]] = refT[ref2D[0][i]];
                relU[ref2D[2][i]] = refR[ref2D[1][i]];
                relL[ref2D[3][i]] = refU[ref2D[2][i]];
            }
        } else {
            for (var i = 0; i < 3; i++) {
                relT[ref2D[0][i]] = refR[ref2D[1][i]];
                relR[ref2D[1][i]] = refU[ref2D[2][i]];
                relU[ref2D[2][i]] = refL[ref2D[3][i]];
                relL[ref2D[3][i]] = refT[ref2D[0][i]];
            } //clockwise in reverse
        }
        switch (side) {
            case "f": this.f = newFace; this.t = relT; this.u = relU; this.r = relR; this.l = relL; break;
            case "b": this.b = newFace; this.t = relT; this.u = relU; this.l = relR; this.r = relL; break;
            case "t": this.t = newFace; this.b = relT; this.f = relU; this.r = relR; this.l = relL; break;
            case "u": this.u = newFace; this.f = relT; this.b = relU; this.r = relR; this.l = relL; break;
            case "r": this.r = newFace; this.t = relT; this.u = relU; this.b = relR; this.f = relL; break;
            case "l": this.l = newFace; this.t = relT; this.u = relU; this.f = relR; this.b = relL; break;
            default: console.log("Unknown Side");
        }
        this.full = [this.f, this.b, this.t, this.u, this.r, this.l];
        this.turns++;
        this.solved = checkCube(this);
        return
    }

    solveBase() {
        var based = this.sidesPlaced();
        while (!based) {
            var refSide, rS, sS, sB, sT, mS,
                refL, rL, sL,
                refR, rR, sR;
            var changed = false;
            for (var i = 0; i < 4; i++) { //t-u-r-l
                switch (i) {
                    case 0: {
                        refSide = Turn.T; rS = this.t;
                        sS = [1, 3, 5]; //rT, rL, rR
                        sB = 1; sT = 1;
                        refL = Turn.L; rL = this.l; sL = 1;
                        refR = Turn.R; rR = this.r; sR = 1;
                        mS = 7;
                        break;
                    }
                    case 1: {
                        refSide = Turn.R; rS = this.r;
                        sS = [5, 1, 7];
                        sB = 5; sT = 3;
                        refL = Turn.T; rL = this.t; sL = 5;
                        refR = Turn.U; rR = this.u; sR = 5;
                        mS = 3;
                        break;
                    }
                    case 2: {
                        refSide = Turn.U; rS = this.u;
                        sS = [7, 5, 3];
                        sB = 7; sT = 7;
                        refL = Turn.R; rL = this.r; sL = 7;
                        refR = Turn.L; rR = this.l; sR = 7;
                        mS = 1;
                        break;
                    }
                    case 3: {
                        refSide = Turn.L; rS = this.l;
                        sS = [1, 3, 5];
                        sB = 3; sT = 5;
                        refL = Turn.U; rL = this.u; sL = 3;
                        refR = Turn.T; rR = this.t; sR = 3;
                        mS = 5;
                        break;
                    }
                }
                //console.log(refSide +  " " + sS + " " + sB + " " + sT + " " + mS);
                //console.log(refL + " " + sL);
                //console.log(refR + " " + sR);
                if (rS[mS] == rS[4] && this.f[sB] == this.f[4]) {
                    continue;
                } //if already placed, continue
                if ((rS[sS[0]] == this.f[4] && this.b[sT] == rS[4]) || (this.b[sT] == this.f[4] && rS[sS[0]] == rS[4])) { //if white piece on top
                    changed = true;
                    if (rS[sS[0]] == this.f[4] && this.b[sT] == rS[4]) { //white front
                        this.turnFace(Turn.B, Turn.CC);
                        this.turnFace(refR, Turn.CC);
                        this.turnFace(refSide, Turn.C);
                        this.turnFace(refR, Turn.C);
                    } else { //white on top
                        this.turnFace(refSide, Turn.C); this.turnFace(refSide, Turn.C);
                    }
                } else if ((rS[sS[1]] == this.f[4] && rL[sL] == rS[4]) || (rL[sL] == this.f[4] && rS[sS[1]] == rS[4])) { //if white piece on left
                    changed = true;
                    if (rS[sS[1]] == this.f[4] && rL[sL] == rS[4]) {
                        this.turnFace(refL, Turn.CC);
                        this.turnFace(Turn.B, Turn.CC);
                        this.turnFace(refSide, Turn.C); this.turnFace(refSide, Turn.C);
                    } else { //white on left side
                        this.turnFace(refSide, Turn.CC);
                    }
                } else if ((rS[sS[2]] == this.f[4] && rR[sR] == rS[4]) || (rR[sR] == this.f[4] && rS[sS[2]] == rS[4])) { //if white piece on right
                    changed = true;
                    if (rS[sS[2]] == this.f[4] && rR[sR] == rS[4]) {
                        this.turnFace(refR, Turn.C);
                        this.turnFace(Turn.B, Turn.CC);
                        this.turnFace(refSide, Turn.C); this.turnFace(refSide, Turn.C);
                    } else { //white on right side
                        this.turnFace(refSide, Turn.C);
                    }
                } else if ((rS[sS[1]] == this.f[4] && rL[sL] != rS[4]) || (rL[sL] == this.f[4] && rS[sS[1]] != rS[4])) { //extract left piece, right piece
                    changed = true;
                    this.turnFace(refSide, Turn.C);
                } else if ((rS[sS[2]] == this.f[4] && rR[sR] != rS[4]) || (rR[sR] == this.f[4] && rS[sS[2]] != rS[4])) {
                    changed = true;
                    this.turnFace(refSide, Turn.CC);
                }
                //console.log(rubix.toString(false));
            }
            based = this.sidesPlaced();
            if (!changed) {
                this.turnFace(Turn.B, Turn.CC); 
            }
        }
        var cornered = this.cornersPlaced();
        while (!cornered) {
            /* in correct slot, wrong orientation
             * check above
             * rotate
             */
            var refSide, refL,
                rS, rL,
                sSL, sSH,
                sLL, sLH,
                sB, sT;
            var changed = false;
            for (var l = 0; l < 4; l++) {
                switch (l) {
                    case 0: {
                        refSide = Turn.T; rS = this.t; sSL = 6; sSH = 0;
                        refL = Turn.L; rL = this.l; sLL = 2; sLH = 0;
                        sB = 0; sT = 2;
                        break;
                    }
                    case 1: {
                        refSide = Turn.R; rS = this.r; sSL = 0; sSH = 2;
                        refL = Turn.T; rL = this.t; sLL = 8; sLH = 2;
                        sB = 2; sT = 0;
                        break;
                    }
                    case 2: {
                        refSide = Turn.U; rS = this.u; sSL = 2; sSH = 8;
                        refL = Turn.R; rL = this.r; sLL = 6; sLH = 8;
                        sB = 8; sT = 6;
                        break;
                    }
                    case 3: {
                        refSide = Turn.L; rS = this.l; sSL = 8; sSH = 6;
                        refL = Turn.U; rL = this.u; sL = 3; sLL = 0; sLH = 6;
                        sB = 6; sT = 8;
                        break;
                    }
                }
                for (var i = 0; i < 4; i++) {
                    var clrs = [this.f[4], rS[4], rL[4]];
                    var cornerClrs = [this.f[sB], rS[sSL], rL[sLL]];
                    var matched = [false, false, false];
                    for (var j = 0; j < 3; j++) {
                        var refC = cornerClrs[j];
                        for (var k = 0; k < 3; k++) {
                            var targetC = clrs[k];
                            if (refC == targetC) {
                                matched[j] = true;
                            }
                        }
                    }
                    var valid = true;
                    for (var j = 0; j < 3; j++) {
                        if (!matched[j]) {
                            valid = false;
                        }
                    }
                    if (valid) {
                        if (this.f[sB] == this.f[4]) {
                            continue; //already placed
                        } else {
                            changed = true;
                            while (this.f[sB] != this.f[4]) {
                                this.turnFace(refSide, Turn.CC);
                                this.turnFace(refL, Turn.C);
                                this.turnFace(refSide, Turn.C);
                                this.turnFace(refL, Turn.CC);
                                this.turnFace(refSide, Turn.CC);
                                this.turnFace(refL, Turn.C);
                                this.turnFace(refSide, Turn.C);
                                this.turnFace(refL, Turn.CC);
                            }
                        }
                    }
                    cornerClrs = [this.b[sT], rS[sSH], rL[sLH]];
                    matched = [false, false, false];
                    for (var j = 0; j < 3; j++) {
                        var refC = cornerClrs[j];
                        for (var k = 0; k < 3; k++) {
                            var targetC = clrs[k];
                            if (refC == targetC) {
                                matched[j] = true;
                            }
                        }
                    }
                    valid = true;
                    for (var j = 0; j < 3; j++) {
                        if (!matched[j]) {
                            valid = false;
                        }
                    }
                    if (valid) {
                        changed = true;
                        this.placeCorner(refL, refSide);
                    }
                }
            }
            cornered = this.cornersPlaced();
            if (!changed) {
                this.turnFace(Turn.B, Turn.CC);
            }
        }
    }

    sidesPlaced() {
        if (this.f[1] != this.f[4] || this.f[3] != this.f[4] || this.f[5] != this.f[4] || this.f[7] != this.f[4]) { //does not match front
            return false
        }
        if (this.t[7] != this.t[4] || this.r[3] != this.r[4] || this.u[1] != this.u[4] || this.l[5] != this.l[4]) { //does not match sides
            return false
        }
        return true
    }

    cornersPlaced() {
        if (this.f[0] != this.f[4] || this.t[6] != this.t[4] || this.l[2] != this.l[4]) {
            return false
        }
        if (this.f[2] != this.f[4] || this.t[8] != this.t[4] || this.r[0] != this.r[4]) {
            return false
        }
        if (this.f[8] != this.f[4] || this.r[6] != this.r[4] || this.u[2] != this.u[4]) {
            return false
        }
        if (this.f[6] != this.f[4] || this.u[0] != this.u[4] || this.l[8] != this.l[4]) {
            return false
        }
        return true
    }

    turnCorner(side_a, side_b, side_c) { //f:b, t:u, l:r = 8 combos //f is base, check this; turn opposite of this
        if (side_a == "f") {
            if (side_b == "t") {
                if (side_c == "l") { //front top left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("l", true);
                        this.turnFace("b", true);
                        this.turnFace("l", false);
                        this.turnFace("b", false);
                    }
                } else { //l //front top right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("t", true);
                        this.turnFace("b", true);
                        this.turnFace("t", false);
                        this.turnFace("b", false);
                    }
                }
            } else { //u
                if (side_c == "r") { //front bot right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("r", true);
                        this.turnFace("b", true);
                        this.turnFace("r", false);
                        this.turnFace("b", false);
                    }
                } else { //l //front bot left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("u", true);
                        this.turnFace("b", true);
                        this.turnFace("u", false);
                        this.turnFace("b", false);
                    }
                }
            }
        } else { //b
            if (side_b == "t") {
                if (side_c == "r") { //back top left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("r", true);
                        this.turnFace("f", true);
                        this.turnFace("r", false);
                        this.turnFace("f", false);
                    }
                } else { //l //back top right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("t", true);
                        this.turnFace("f", true);
                        this.turnFace("t", false);
                        this.turnFace("f", false);
                    }
                }
            } else { //u
                if (side_c == "r") { //back bot right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("l", true);
                        this.turnFace("f", true);
                        this.turnFace("l", false);
                        this.turnFace("f", false);
                    }
                } else { //l //back bot left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("u", true);
                        this.turnFace("f", true);
                        this.turnFace("u", false);
                        this.turnFace("f", false);
                    }
                }
            }
        }
    }

    solveMid() {
        var midded = this.midsPlaced();
        for (var z = 0; z < 8; z++) {
            var changed = false;
            for (var i = 0; i < 4; i++) {
                var refSide, refL;
                var rS, rL;
                var ssT, sSS, sL, sT;
                switch (i) {
                    case 0:
                        refSide = Turn.T; refL = Turn.L;
                        rS = this.t; rL = this.l;
                        ssT = 1; sSS = 3; sL = 1; sT = 1;
                        break;
                    case 1:
                        refSide = Turn.R; refL = Turn.T;
                        rS = this.r; rL = this.t;
                        ssT = 5; sSS = 1; sL = 5; sT = 3;
                        break;
                    case 2:
                        refSide = Turn.U; refL = Turn.R;
                        rS = this.u; rL = this.r;
                        ssT = 7; sSS = 5; sL = 1; sT = 7;
                        break;
                    case 3:
                        refSide = Turn.L; refL = Turn.U;
                        rS = this.l; rL = this.u;
                        ssT = 3; sSS = 7; sL = 3; sT = 7;
                        break;
                }
                if (rS[sSS] == rS[4] && rL[sL] == rL[4]) { //if in place or one-side-yellow
                    continue;
                } else if (rS[ssT] == rS[4] || rL[sT] == rL[4]) { //slotted in top
                    if (rS[ssT] == rS[4]) {
                        this.slotSide(refSide, refL, refSide);
                        changed = true;
                        //console.log("FROM TOP:\n" + rubix.toString(false));
                    } else if (rL[sT] == rL[4]) {
                        this.slotSide(refSide, refL, refL);
                        changed = true;
                        //console.log(rubix.toString(false));
                    }
                } else if (rS[sSS] != rL[4] && rL[sL] == rS[4]) { //opposite or misplaced -> remove
                    this.slotSide(refSide, refL, refL);
                    changed = true;
                    //console.log(rubix.toString(false));
                }
            }
            midded = this.midsPlaced();
            if (!changed) {
                this.turnFace(Turn.B, Turn.CC);
            }
            //console.log(rubix.toString(false));
        }
    }

    midsPlaced() {
        if (this.t[3] != this.t[4] || this.l[1] != this.l[4]) {
            return false
        }
        if (this.r[1] != this.r[4] || this.t[5] != this.t[4]) {
            return false
        }
        if (this.u[5] != this.u[4] || this.r[7] != this.r[4]) {
            return false
        }
        if (this.l[7] != this.l[4] || this.u[3] != this.u[4]) {
            return false
        }
        return true
    }

    slotSide(side_a, side_b, top_side) { 
        var left, right; //where left is left-most, right is right-most, top is which side the edge is on
        if (orderedSides.indexOf(side_a) < orderedSides.indexOf(side_b)) {
            left = side_a; right = side_b;
        } else {
            left = side_b; right = side_a;
        }
        //place t & l
        if ((side_a == "t" && side_b == "l") || (side_b == "t" && side_a == "l")) {
            switch (side_a) {
                case "t": left = side_b; right = side_a;
                case "l": left = side_a; right = side_b;
            }
        }
        switch (top_side) { //u is different! fix this somehow? actually not, ez
            case right: {
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(left, Turn.CC);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(left, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(right, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(right, Turn.CC);
                break;
                /* away from left (b cc)
                 * left cc
                 * b c, l c
                 * b c, right c
                 * b cc, right cc
                */
            }
            case left: {
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(right, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(right, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(left, Turn.CC);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(left, Turn.C);
                break;
                /* away from right (b c)
                 * right c
                 * b cc, r cc
                 * b cc, left cc
                 * b c, left c
                */
            }
        }
    }

    solveTop() {
        var ct = 0, placed = [];
        for (var i = 0; i < 4; i++) {
            if (this.b[edges[i]] == this.b[4]) {
                placed.push(edges[i]);
                ct++;
            }
        }
        while (ct != 4) {
            if (ct == 0) {
                this.turnFace(Turn.T, Turn.C);
                this.turnFace(Turn.R, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(Turn.R, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(Turn.T, Turn.CC);
                break;
            } else if (ct == 2) {
                this.findTopSides(placed[0], placed[1]);
            }
            ct = 0;
            for (var i = 0; i < 4; i++) {
                if (this.b[edges[i]] == this.b[4]) {
                    ct++;
                }
            }
        }
        while (this.t[1] != this.t[4] || this.u[7] != this.u[4] || this.r[5] != this.r[4] || this.l[3] != this.l[4]) {
            for (var i = 0; i < 4; i++) {
                var e = edges[i];
                var refSide, refL, refR;
                var rS, rL, rR;
                var sS, sL, sR;
                switch (e) {
                    case 1: {
                        refSide = Turn.T; refL = Turn.L; refR = Turn.R;
                        rS = this.t; rL = this.l; rR = this.r;
                        sS = 1; sL = 3; sR = 5;
                        break; //t
                    }
                    case 3: {
                        refSide = Turn.R; refL = Turn.T; refR = Turn.U;
                        rS = this.r; rL = this.t; rR = this.u;
                        sS = 5; sL = 1; sR = 7;
                        break; //r
                    }
                    case 5: {
                        refSide = Turn.L; refL = Turn.U; refR = Turn.T;
                        rS = this.l; rL = this.u; rR = this.t;
                        sS = 3; sL = 7; sR = 1;
                        break; //l
                    }
                    case 7: {
                        refSide = Turn.U; refL = Turn.R; refR = Turn.L;
                        rS = this.u; rL = this.r; rR = this.l;
                        sS = 7; sL = 5; sR = 3;
                        break; //u
                    }
                }
                if (rS[sS] == rL[4]) { //opposite
                    if (rL[sL] != rS[4]) { //other side not opposite
                        this.turnFace(Turn.B, Turn.C);
                    } else {
                        this.slotTopSides(refR);
                    }
                }
                /* detect misaligned edges
                * edge case: three that need swapping
                * if 1 is not aligned, check if the left-side is opposite aligned & side is op aligned
                * if so, run slot on right of top
                * if next is not opposite but IS misaligned, rotate once left
                * if 1 is not aligned and not opposite, rotate once right
                */
            }
        }
        var cornersPlaced = false;
        while (!cornersPlaced) {
            cornersPlaced = rubix.findCorners();
        }
        rubix.slotTopCorners();
        if (this.t[1] != this.t[4]) { //needs more turns
            //check whether left or right is closer
            if (this.t[1] == this.l[4]) {
                this.turnFace(Turn.B, Turn.C);
            } else if (this.t[1] == this.r[4]) {
                this.turnFace(Turn.B, Turn.CC);
            } else {
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
            }
        }
    }

    findTopSides(placed_a, placed_b) { //repeat on x turns
        var shape; //1 for L, 2 for hori
        var relT, relR;
        if ((placed_a == 1 && placed_b == 3) ||(placed_a == 3 && placed_b == 1))  {
            relT = Turn.U; relR = Turn.L; shape = 1;
        } else if ((placed_a == 1 && placed_b == 5) || (placed_a == 5 && placed_b == 1)) {
            relT = Turn.R; relR = Turn.U; shape = 1;
        } else if ((placed_a == 5 && placed_b == 7) || (placed_a == 7 && placed_b == 5)) {
            relT = Turn.T; relR = Turn.R; shape = 1;
        } else if ((placed_a == 3 && placed_b == 7) || (placed_a == 5 && placed_b == 7)) {
            relT = Turn.L; relR = Turn.T; shape = 1;
        } else if ((placed_a == 3 && placed_b == 5) || (placed_a == 5 && placed_b == 3)) {
            relT = Turn.T; relR = Turn.R; shape = 2;
        } else if ((placed_a == 1 && placed_b == 7) ||(placed_a == 7 && placed_b == 1)) {
            relT = Turn.L; relR = Turn.T; shape = 2;
        }
        switch (shape) {
            case 1: {
                this.turnFace(relT, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(relR, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(relR, Turn.CC);
                this.turnFace(relT, Turn.CC);
                break;
            }
            case 2: {
                this.turnFace(relT, Turn.C);
                this.turnFace(relR, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(relR, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(relT, Turn.CC);
                break;
            }
        }
    }

    slotTopSides(relR) { //where relR is to the right of misplaced/swapped edge
        this.turnFace(relR, Turn.C);
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.CC);
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.C);
        this.turnFace(Turn.B, Turn.C); this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.CC);
        this.turnFace(Turn.B, Turn.C);
    }

    findCorners() {
        var cornerLoc, cornerFound;
        cornerFound = false;
        for (var i = 0; i < 4; i++) {
            var clrs = [this.b[4]];
            var cornerClrs = [this.b[corners[i]]];
            var matched = [false, false, false];
            switch (corners[i]) {
                case 0: {
                    cornerClrs.push(this.t[2]); cornerClrs.push(this.r[2]);
                    clrs.push(this.t[4]); clrs.push(this.r[4]);
                    break;
                }
                case 2: {
                    cornerClrs.push(this.l[0]); cornerClrs.push(this.t[0]);
                    clrs.push(this.l[4]); clrs.push(this.t[4]);
                    break;
                }
                case 6: {
                    cornerClrs.push(this.r[8]); cornerClrs.push(this.u[8]);
                    clrs.push(this.r[4]); clrs.push(this.u[4]);
                    break;
                }
                case 8: {
                    cornerClrs.push(this.u[6]); cornerClrs.push(this.l[6]);
                    clrs.push(this.u[4]); clrs.push(this.l[4]);
                    break;
                }
            }
            for (var j = 0; j < 3; j++) {
                var refC = cornerClrs[j];
                for (var k = 0; k < 3; k++) {
                    var targetC = clrs[k];
                    if (refC == targetC) {
                        matched[j] = true;
                    }
                    //if not matched, try to match
                    //if all matched, end
                }
            }
            cornerFound = true;
            for (var j = 0; j < 3; j++) {
                if (!matched[j]) {
                    cornerFound = false;
                }
            }
            if (cornerFound) {
                cornerLoc = corners[i];
            }
            /* 0 = t 2 r 2
             * 2 = l 0 t 0
             * 6 = u 8 r 8
             * 8 = l 6 r 6
             * must match all three sides
             */
        }
        var relR = "n", relL = "n";
        switch (cornerLoc) {
            case 0:
                relR = Turn.R; relL = Turn.L;
                break;
            case 2:
                relR = Turn.T; relL = Turn.U;
                break;
            case 6:
                relR = Turn.U; relL = Turn.T;
                break;
            case 8:
                relR = Turn.L; relL = Turn.R;
                break;
        }
        if (relR != "n") {
            this.turnFace(Turn.B, Turn.C);
            this.turnFace(relR, Turn.C); //problem: no relR available
            this.turnFace(Turn.B, Turn.CC);
            this.turnFace(relL, Turn.CC);
            this.turnFace(Turn.B, Turn.C);
            this.turnFace(relR, Turn.CC);
            this.turnFace(Turn.B, Turn.CC);
            this.turnFace(relL, Turn.C);
        } else {
            this.turnFace(Turn.B, Turn.C);
            this.turnFace(Turn.R, Turn.C); //problem: no relR available
            this.turnFace(Turn.B, Turn.CC);
            this.turnFace(Turn.L, Turn.CC);
            this.turnFace(Turn.B, Turn.C);
            this.turnFace(Turn.R, Turn.CC);
            this.turnFace(Turn.B, Turn.CC);
            this.turnFace(Turn.L, Turn.C);
        }
        var toRet = false;
        for (var i = 0; i < 4; i++) {
            var clrs = [this.b[4]];
            var cornerClrs = [this.b[corners[i]]];
            var matched = [false, false, false];
            switch (corners[i]) {
                case 0: {
                    cornerClrs.push(this.t[2]); cornerClrs.push(this.r[2]);
                    clrs.push(this.t[4]); clrs.push(this.r[4]);
                    break;
                }
                case 2: {
                    cornerClrs.push(this.l[0]); cornerClrs.push(this.t[0]);
                    clrs.push(this.l[4]); clrs.push(this.t[4]);
                    break;
                }
                case 6: {
                    cornerClrs.push(this.r[8]); cornerClrs.push(this.u[8]);
                    clrs.push(this.r[4]); clrs.push(this.u[4]);
                    break;
                }
                case 8: {
                    cornerClrs.push(this.u[6]); cornerClrs.push(this.l[6]);
                    clrs.push(this.u[4]); clrs.push(this.l[4]);
                    break;
                }
            }
            for (var j = 0; j < 3; j++) {
                var refC = cornerClrs[j];
                for (var k = 0; k < 3; k++) {
                    var targetC = clrs[k];
                    if (refC == targetC) {
                        matched[j] = true;
                    }
                    //if not matched, try to match
                    //if all matched, end
                }
            }
            toRet = true;
            for (var j = 0; j < 3; j++) {
                if (!matched[j]) {
                    toRet = false;
                }
            }
            /* 0 = t 2 r 2
             * 2 = l 0 t 0
             * 6 = u 8 r 8
             * 8 = l 6 r 6
             * must match all three sides
             */
        }
        return toRet
    }

    slotTopCorners() {
        while (this.b[0] != this.b[4] || this.b[2] != this.b[4] || this.b[6] != this.b[4] || this.b[8] != this.b[4]) {
            if (this.b[0] != this.b[4]) {
                this.turnCorner(Turn.B, Turn.T, Turn.R);
            }
            this.turnFace(Turn.B);
        }
    }

    placeCorner(relT, relR) { //where corner is above appropriate spot
        this.turnFace(relT, Turn.C); this.turnFace(relR, Turn.CC);
        this.turnFace(relT, Turn.CC); this.turnFace(relR, Turn.C);
    }

    toString(html) {
        var s = "";
        for (var i = 0; i < 6; i++) {
            switch (i) {
                case 0: s += "f:"; break;
                case 1: s += "b:"; break;
                case 2: s += "t:"; break;
                case 3: s += "u:"; break;
                case 4: s += "r:"; break;
                case 5: s += "l:"; break;
            }
            s += (html ? "<br>" : "\n");
            for (var j = 0; j < 3; j++) {
                s += (this.full[i][3 * j] + " " + this.full[i][3 * j + 1] + " " + this.full[i][3 * j + 2] + (html ? "<br>" : "\n"));
            }
            s += (html ? "<br>" : "\n");
        }
        s += "IS RUBIX SOLVED? " + (this.solved ? "YES" : "NO") + (html ? "<br>" : "\n");
        s += "NUMBER OF TURNS: " + this.turns + (html ? "<br>" : "\n");
        return s
    }
}
var w = "W", y = "Y", b = "B", g = "G", r = "R", o = "O";
var solvedCubeList = [ [w, w, w,
                        w, w, w,
                        w, w, w
                       ],
                       [
                        r, g, y,
                        o, y, b,
                        g, y, y
                       ],
                       [b, y, y,
                        b, b, b,
                        b, b, b
                       ],
                       [
                        g, g, g,
                        r, g, g,
                        r, o, y
                       ],
                       [
                        r, r, b,
                        r, r, g,
                        r, r, o
                       ],
                       [
                        o, o, o,
                        y, o, o,
                        g, y, o
                       ]
];
var solvedCube = new Cube(solvedCubeList);
var rubix = new Cube([...solvedCubeList]);
console.log(rubix.toString(false));
rubix.solveMid();
rubix.solveTop();
console.log(rubix.toString(false));
