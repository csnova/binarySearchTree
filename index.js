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

prettyPrint(root.root);

// /* A utility function to print preorder traversal of BST */
// function preOrder(node) {
//   if (node == null) {
//     return;
//   }
//   document.write(node.data + " ");
//   preOrder(node.left);
//   preOrder(node.right);
// }

// /* A utility function to print inorder traversal of BST */
// function inOrder(node) {
//   if (node == null) {
//     return;
//   }
//   inOrder(node.left);
//   document.write(node.data + " ");
//   inOrder(node.right);
// }

// /* A utility function to print postorder traversal of BST */
// function postOrder(node) {
//   if (node == null) {
//     return;
//   }
//   postOrder(node.left);
//   postOrder(node.right);
//   document.write(node.data + " ");
// }

// let arr = [1, 2, 3, 4, 5, 6, 7];
// root = sortedArrayToBST(arr, 0, arr.length - 1);

// document.write("Preorder traversal of constructed BST<br>");
// preOrder(root);

// document.write("<br><br>");

// document.write("Inorder traversal of constructed BST<br>");
// inOrder(root);

// document.write("<br><br>");

// document.write("Postorder traversal of constructed BST<br>");
// postOrder(root);
