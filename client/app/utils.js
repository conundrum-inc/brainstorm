export function commentsToNodes(comments, coords) {

  if (!coords) {
    var initCoords;
    //iterate through comments to give
  }

  var nodes = {
    nodes: [],
    links: []
  }
  for(var i = 0; i < comments.length; i++) {
    if (comments[i].parent_id === 'root') {
      var node = { key: comments[i]._id,
                   size: 55,
                   x: coords ? coords[0]['x'] : window.innerWidth / 2,
                   y: coords ? coords[0]['y']: window.innerHeight / 2,
                   title: comments[i].title,
                   text: comments[i].text,
                   children: comments[i].children,
                   upvotes: comments[i].upvotes,
                   downvotes: comments[i].downvotes,
                   score: comments[i].score
                 }
      nodes.nodes.push(node);
    } else {
        if (coords) {
          var temp = findIndex(coords, 'key', comments[i].parent_id);
        }
      var node = { key: comments[i]._id,
                   x: coords ? (coords[i] ? coords[i]['x'] : coords[temp]['x'] ) : window.innerWidth / 2,
                   y: coords ? (coords[i] ? coords[i]['y'] : coords[temp]['y'] ) : window.innerHeight / 2,
                   size: 40 + ( 5 * comments[i].score ),
                   title: comments[i].title,
                   text: comments[i].text,
                   children: comments[i].children,
                   upvotes: comments[i].upvotes,
                   downvotes: comments[i].downvotes,
                   score: comments[i].score
                 }

      nodes.nodes.push(node);

      //find the index of the node in nodes.nodes whose
      //key matches the parent_id of the current comment
      var index = findIndex(nodes.nodes, 'key', comments[i].parent_id);

      var link = { source: nodes.nodes.length - 1,
                   target: index,
                   key: comments[i]._id,
                   size: 2
                 };
      nodes.links.push(link);
    }
  }
  return nodes;
}

function findIndex(array, attr, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][attr]===value) {
      return i
    }
  }
  return -1
}

export function splitText(string) {
  string = string.split(" ");
  var mid = Math.floor(string.length / 2)
  var first = string.slice(0, mid).join(' ');
  var second = string.slice(mid).join(' ');
  return [first, second]

}

export function randomBlue() {
  var blues = ['#aedee0', '#afd9dd', '#cae9ea', '#c7e2e1'];
  var random = Math.floor(Math.random() * 4);
  return blues[random];
}
