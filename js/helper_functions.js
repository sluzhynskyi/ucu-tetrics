var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map(el => (new Array(8).fill())));

function createRandomObj(){
    let obj = JSON.parse(JSON.stringify(possible_objects[Math.floor(Math.random() * 5)]));
    objects.push(obj);
}