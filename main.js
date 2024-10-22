try {
    var keys = {};


    var pentagon = new Polygon([
        {x: 1200, y: 100},
        {x: 1700, y: 100},
        {x: 1900, y: 600},
        {x: 1450, y: 1000},
        {x: 1000, y: 600}
    ]);


    var player = new Player(
        {x: 800, y: 500},
        0,
        new Polygon([
            {x: 0, y: -200},
            {x: 200, y: 200},
            {x: -150, y: -50}
        ])
    );

    
    function drawThings() {
        background(255, 255, 255);
        pentagon.render();
        player.render();


        fill(0);
        textSize(20);
        text(player.getPolygon().polygonInPolygon(pentagon), 0, 40);
        // 1 if colliding, 0 if on line, -1 if not colliding
    }


    function keyPressed() {
        keys[keyCode] = true;
    }

    function keyReleased() {
        keys[keyCode] = false;
    }


    function setup() {
        createCanvas(2000, 1200);
    }

    function draw() {
        if (keys[87])
            player.xyz.y -= 5;
        if (keys[83])
            player.xyz.y += 5;
        if (keys[65])
            player.xyz.x -= 5;
        if (keys[68])
            player.xyz.x += 5;
        if (keys[81])
            player.rotation -= 0.05;
        if (keys[69])
            player.rotation += 0.05;
        //w: 87, s: 83, a: 65, d: 68, q: 81, e: 69
        
        drawThings();
    }

} catch (e) {
    alert(e);
}
