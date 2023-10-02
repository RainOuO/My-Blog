// easy 第一題 給一個裡面元素為int的陣列，陣列中會有兩個元素加起來等於target，回傳這兩個元素的位置。
// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution.
// Example:
// Given nums = [2, 7, 11, 15], target = 9,
// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

let twoSum = function (nums, target) {
  const sumMap = new Map(); // 創建一個 Map 來存儲數字和它們的索引
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    /*
      假設我們的目標數 target 是 9，而我們正在查看的數字是 2（也就是 nums[i] = 2）。
      為了使這個 2 成為目標數 9 的一部分，我們需要找到另一個數字，它的值是 target - 2，
      也就是 9 - 2 = 7。所以在這個情況下，complement 是 7。
     */
    if (sumMap.has(complement)) {
      return [sumMap.get(complement), i];
    }
    sumMap.set(nums[i], i);
  }
  return [];
};
twoSum([2, 7, 6, 1, 8, 5], 9);

//! 27題目
/**
Given an array and a value, remove all instances of that value in place and return the new length.

Do not allocate extra space for another array, you must do this in place with constant memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

Example: Given input array nums = [3,2,2,3], val = 3

Your function should return length = 2, with the first two elements of nums being 2.
給一個陣列跟一個數字，移除陣列中所有跟數字相同的元素。

不可以使用另外的陣列來處理，全部的操作都要在同一個陣列中。

陣列中的元素可以隨意排序。
 */

const removeElement = (nums, val) => {
  let index = 0; // 初始化索引
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[index] = nums[i]; // 將不等於 val 的數字移到前面
      // console.log('INDEX', nums[index]);
      index++; // 更新索引
    }
  }
  return index; // 返回新陣列的長度
};

const resultLeetCode27 = removeElement([3, 1, 2, 3, 2, 4], 3);
console.log('this LeetCode27:', resultLeetCode27);

//! 反轉整數（Reverse Integer） - 題號：7
/*
反轉一個int整數。

x = 123 , return 321 x = -123 , return -321

提示：
假如10，100反轉後會長怎樣。

你有注意到反轉後的數可能會超過Integer的範圍嗎，例如說1000000003反轉後就超過了32-bit的integer。這種情況要怎麼處理?

在這個問題中，超過integer只要回傳0就可以。
 */

const reverse = (x) => {
  const INT_MAX = Math.pow(2, 31) - 1; // 32 位有符號整數的最大值
  const INT_MIN = -Math.pow(2, 31); // 32 位有符號整數的最小值
  let reverseX = x.toString().split('').reverse().join('');
  if (x < 0) {
    reverseX = '-' + reverseX.replace('-', '');
  }
  const result = parseInt(reverseX);
  if (reverseX > INT_MAX || reverseX < INT_MIN) {
    return 0;
  }
  return result;
};
const results = reverse(-123);
// console.log('resutle', results);

//! LeetCode 21. Merge Two Sorted Lists
/*
題目
Merge two sorted linked lists and return it as a new list. 
The new list should be made by splicing together the nodes of the first two lists.

翻譯
融合兩個排序過的連結串列為一個新的連結串列後回傳。

範例：
[1,2,2,3] + [1,3] = [1,1,2,2,3,3]
*/
let list1 = [1, 2, 2, 3];
let list2 = [1, 3];

let mergeTwoLists = function (list1, list2) {
  let sumVal = list1.concat(list2);
  let sumRedux = sumVal.sort((a, b) => a - b);
  return sumRedux;
};

const result = mergeTwoLists(list1, list2);

// console.log(result);

//! LeetCode 283. Move Zeroes
/*
Given an array nums, write a function to move all 0's to the end of it while maintaining the
 relative order of the non-zero elements.

For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].
Note:
You must do this in-place without making a copy of the array.
Minimize the total number of operations.
翻譯
給一個陣列，把裡面出現的0搬到陣列最後面，剩下的元素保持原本的排序。

範例：
nums = [0, 1, 0, 3, 12] ，執行後回傳[1, 3, 12, 0, 0]

注意：
只能在當前陣列中操作，不能用一個新的陣列來解。盡量減少操作次數。
 */

const moveZeroeA = function (numbers) {
  let index = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== 0) {
      numbers[index] = numbers[i];
      index++;
    }
  }
  for (let n = index; n < numbers.length; n++) {
    numbers[n] = 0;
  }
  return numbers;
};
const resultt = moveZeroeA([0, 1, 0, 3, 12]);
console.log('it show time', resultt);

//- 283開始
const moveZeroes = function (nums) {
  let nonZeroIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // 將非零元素移到前面
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
      console.log(nonZeroIndex);
    }
  }

  // 將剩餘的位置填充為零
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

let numVal = [0, 1, 0, 3, 12];
const moveZeroesResult = moveZeroes(numVal);
console.log('moveZeroesResult', moveZeroesResult);

/*
兩數之和（Two Sum） - 題號：1

要求找出數組中兩個數的索引，使它們的和等於目標值。
反轉整數（Reverse Integer） - 題號：7
! 7題 OK 
要求反轉給定的整數。
回文數（Palindrome Number） - 題號：9

判斷一個整數是否是回文數。
羅馬數字轉整數（Roman to Integer） - 題號：13

將羅馬數字轉換為整數。
整數轉羅馬數字（Integer to Roman） - 題號：12

將整數轉換為羅馬數字表示形式。
有效的括號（Valid Parentheses） - 題號：20

判斷一個包含 '(', ')', '{', '}', '[' 和 ']' 的字符串是否有效。
合併兩個有序數組（Merge Sorted Array） - 題號：88

合併兩個已排序的數組。
移除元素（Remove Element） - 題號：27
! 27題 OK
從數組中移除指定的元素。
最大子數組（Maximum Subarray） - 題號：53

找到一個數組中的連續子數組，使其總和最大。
合併兩個有序鏈表（Merge Two Sorted Lists） - 題號：21
! 21題OK

合併兩個有序的鏈表。

零移動（Move Zeroes） - 題號：283

將數組中的所有零移動到末尾，保持其他元素的相對順序。

*/

//-其他練習

// 句子中如果是1或2個字元的單字就換成小寫，其餘單字則是大小寫轉換，且第一個字母永遠是大寫。

function transformSentence(appendWord) {
  const words = appendWord.split(' ');
  function sortText(word) {
    if (word.length <= 2) {
      return word.toLowerCase();
    } else {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }
  const textmap = words.map(sortText);
  const transformedSentence = textmap.join(' ');
  return transformedSentence;
}

const inputSentence = 'THis is A TeSt for sHort wOrds.';
const Textresult = transformSentence(inputSentence);
console.log(Textresult); // "Ths is a test for short words."

// 第二題:攤平一個陣列內的元素，陣列內可能還有陣列多層崁套，最後的結果必須是小到大排序。
function flattenAndSort(arr) {
  const sumArr = arr.reduce((acc, current) => {
    if (Array.isArray(current)) {
      return acc.concat(flattenAndSort(current));
    } else {
      acc.push(current);
      return acc;
    }
  }, []);
  return sumArr.sort((a, b) => a - b);
}

const nestedArray = [5, 2, [7, -1], 3, [6, [4, 9]]];
const resultflatt = flattenAndSort(nestedArray);
console.log(resultflatt); // [ -1, 2, 3, 4, 5, 6, 7, 9 ]
