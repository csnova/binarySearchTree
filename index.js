// A binary tree node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
    this.levelOrderList = [];
    this.preOrderList = [];
    this.inOrderList = [];
    this.postOrderList = [];
  }

  insert(value, node = this.root, parent = null) {
    // Add a new node with this value

    // Base Case
    if (node === null) {
      node = new Node(value);
      if (value < parent.data) {
        parent.left = node;
      } else if (value > parent.data) {
        parent.right = node;
      }
    }

    // Traverse Tree
    else if (value < node.data) {
      this.insert(value, node.left, node);
    } else if (value > node.data) {
      this.insert(value, node.right, node);
    } else {
      return;
    }
  }

  delete(value, node = this.root, parent = null) {
    // Delete a node with this value

    // Base Case
    if (node === null) {
      return;
    }

    // Find the node
    if (value < node.data) {
      this.delete(value, node.left, node);
    } else if (value > node.data) {
      this.delete(value, node.right, node);
    }
    // If we are at the value replace the children
    else {
      // For nodes with 0 children
      if (node.left === null && node.right === null) {
        parent.left = null;
        parent.right = null;
        return;
      }
      // For nodes with 1 child
      else if (node.left !== null && node.right === null) {
        if (parent.data > node.data) parent.left = node.left;
        if (parent.data < node.data) parent.right = node.left;
      } else if (node.left === null && node.right !== null) {
        if (parent.data > node.data) parent.left = node.right;
        if (parent.data < node.data) parent.right = node.right;
      }
      // For nodes with 2 children
      else {
        //
        let nextLargest = node.right;
        let nextLargestParent = node;
        // Find the next largest node to the deleted value
        while (nextLargest.left != null) {
          nextLargestParent = nextLargest;
          nextLargest = nextLargest.left;
        }
        nextLargestParent.left = null;
        nextLargest.right = node.right;
        nextLargest.left = node.left;
        if (parent === null) this.root = nextLargest;
        else if (parent.data > node.data) parent.left = nextLargest;
        else if (parent.data < node.data) parent.right = nextLargest;
      }
    }
  }

  find(value) {
    // Find a node with this value
    if (this.root == null) {
      return "Empty Tree";
    }

    let queue = [this.root];
    let node = this.root;
    while (node.data !== value) {
      if (queue.length === 0) return "Not in Tree";
      node = queue.pop();
      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }
    return node;
  }

  levelOrder(func = this.toArray) {
    // Traverse the Tree in Level order, giving the values as an input for the function
    if (this.root === null) {
      return;
    }

    let queue = [this.root];
    while (queue.length != 0) {
      let node = queue.pop();
      func(this.levelOrderList, node.data);
      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }
    return this.levelOrderList;
  }

  preOrder(func) {
    // Adds Items to List
    this.preOrderList = [];
    return this.printPreOrder(func);
  }

  printPreOrder(func = this.toArray, node = this.root) {
    // Traverse the Tree preOrder, giving the values as an input for the function
    if (node === null) {
      return;
    }
    func(this.preOrderList, node.data);
    this.printPreOrder(func, node.left);
    this.printPreOrder(func, node.right);
    return this.preOrderList;
  }

  inOrder(func) {
    // Adds Items to List
    this.inOrderList = [];
    return this.printInOrder(func);
  }

  printInOrder(func = this.toArray, node = this.root) {
    // Traverse the Tree InOrder, giving the values as an input for the function
    if (node === null) {
      return;
    }
    this.printInOrder(func, node.left);
    func(this.inOrderList, node.data);
    this.printInOrder(func, node.right);
    return this.inOrderList;
  }

  postOrder(func) {
    // Adds Items to List
    this.postOrderList = [];
    return this.printPostOrder(func);
  }

  printPostOrder(func = this.toArray, node = this.root) {
    // Traverse the Tree PostOrder, giving the values as an input for the function
    if (node === null) {
      return;
    }
    this.printPostOrder(func, node.left);
    this.printPostOrder(func, node.right);
    func(this.postOrderList, node.data);
    return this.postOrderList;
  }

  toArray(arr, value) {
    // Default function to run for levelOrder, preOrder, inOrder, & postOrder
    arr.push(value);
  }

  height(value) {
    // Output the number of edges in longest path from a given node to a leaf node
  }

  depth(value) {
    // Output the number of edges in path from a given node to the tree’s root node
  }

  isBalanced() {
    // Checks if the tree is balanced
  }

  reBalance() {
    // If tree is not balanced will reBalance it
  }
}

function buildTree(arr) {
  // If the array has zero parts it is done and should return
  if (arr.length === 0) {
    return null;
  }

  //   Sort the Array
  arr = mergeSort(arr);

  //   Finds the midpoint of the array
  let mid = Math.round((arr.length - 1) / 2);

  //   Makes a node from the current mid point
  let node = new Node(arr[mid]);

  //   Recursively makes left and right branches of tree
  let leftArr = arr.slice(0, mid);
  node.left = buildTree(leftArr);
  let rightArr = arr.slice(mid + 1, arr.length);
  node.right = buildTree(rightArr);

  //   Returns the root node
  return node;
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  let half = Math.round(array.length / 2);

  let lChunk = mergeSort(array.slice(0, half));
  let rChunk = mergeSort(array.slice(half));

  return merge(lChunk, rChunk);
}

function merge(a, b) {
  let result = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0] === b[0]) {
      a.shift();
    } else if (a[0] < b[0]) {
      result.push(a.shift());
    } else {
      result.push(b.shift());
    }
  }
  return [...result, ...a, ...b];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let root = new Tree(arr);

// function printValues(arr, value) {
//   console.log(value);
// }
// root.inOrder(printValues);

prettyPrint(root.root);
console.log(root.levelOrder());
console.log(root.preOrder());
console.log(root.inOrder());
console.log(root.postOrder());
console.log(root.find(3));
// root.delete(4);
root.insert(6);
console.log(root.inOrder());
