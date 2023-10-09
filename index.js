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
    this.root = this.buildTree(arr);
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
    if (this.root === null) {
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

  height(node) {
    // Output the number of edges in longest path from a given node to a leaf node
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
    // }
  }

  depth(value, node = this.root, level = 0) {
    // Output the number of edges in path from a given node to the tree’s root node
    if (node === null) {
      return "Value Not in Tree";
    } else if (value < node.data) {
      level++;
      return this.depth(value, node.left, level);
    } else if (value > node.data) {
      level++;
      return this.depth(value, node.right, level);
    }
    return level;
  }

  isBalanced() {
    // Checks if the tree is balanced
    const allNodes = this.inOrder();
    for (let i = 0; i < allNodes.length; i++) {
      const node = this.find(allNodes[i]);
      const leftSubtree = this.height(node.left);
      const rightSubtree = this.height(node.right);
      if (Math.abs(leftSubtree - rightSubtree) > 1) return false;
    }
    return true;
  }

  reBalance() {
    // If tree is not balanced will reBalance it
    const currentTreeArray = this.inOrder();
    this.root = this.buildTree(currentTreeArray);
  }

  buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }

    //   Sort the Array
    arr = this.mergeSort(arr);

    //   Finds the midpoint of the array
    let mid = Math.round((arr.length - 1) / 2);

    //   Makes a node from the current mid point
    let node = new Node(arr[mid]);

    //   Recursively makes left and right branches of tree
    let leftArr = arr.slice(0, mid);
    node.left = this.buildTree(leftArr);
    let rightArr = arr.slice(mid + 1, arr.length);
    node.right = this.buildTree(rightArr);

    //   Returns the root node
    return node;
  }

  mergeSort(array) {
    if (array.length <= 1) return array;

    let half = Math.round(array.length / 2);

    let lChunk = this.mergeSort(array.slice(0, half));
    let rChunk = this.mergeSort(array.slice(half));

    return this.merge(lChunk, rChunk);
  }

  merge(a, b) {
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

function randomNumbers(count, max) {
  let allNumbers = [];
  for (let i = 0; i < count; i++) {
    let currentNum = Math.floor(Math.random() * max);
    allNumbers.push(currentNum);
  }
  return allNumbers;
}

function driverTree(count, max) {
  let arr = randomNumbers(count, max);
  let root = new Tree(arr);
  console.log(`Tree is Balanced: ${root.isBalanced()}`);
  console.log(`Tree in Level Order: ${root.levelOrder()}`);
  console.log(`Tree in Preorder Order: ${root.preOrder()}`);
  console.log(`Tree in Inorder Order: ${root.inOrder()}`);
  console.log(`Tree in Postorder Order: ${root.postOrder()}`);
  root.insert(randomNumbers(1, 100));
  root.insert(randomNumbers(1, 100));
  root.insert(randomNumbers(1, 100));
  console.log(`Tree is Balanced: ${root.isBalanced()}`);
  root.reBalance();
  console.log("Tree has been rebalanced");
  console.log(`Tree is Balanced: ${root.isBalanced()}`);
  return root;
}

prettyPrint(driverTree(20, 100).root);
