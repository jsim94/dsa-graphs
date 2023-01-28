class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (!this.nodes.has(vertex)) this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => this.addVertex(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!v1.adjacent.has(v2) && !v2.adjacent.has(v1)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2) && v2.adjacent.has(v1)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, stack = [start], seen = new Set()) {
    if (stack.length === 0) {
      const result = [...seen].map((node) => node.value);
      return result;
    }

    const node = stack.pop();
    seen.add(node);

    node.adjacent.forEach((adjNode) => {
      if (!seen.has(adjNode)) {
        stack.push(adjNode);
      }
    });

    return this.depthFirstSearch(start, stack, seen);
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start, stack = [start], seen = new Set()) {
    if (stack.length === 0) {
      const result = [...seen].map((node) => node.value);
      return result;
    }

    const node = stack.shift();
    seen.add(node);

    node.adjacent.forEach((adjNode) => {
      if (!seen.has(adjNode)) {
        stack.push(adjNode);
      }
    });

    return this.breadthFirstSearch(start, stack, seen);
  }
}

module.exports = { Graph, Node };
