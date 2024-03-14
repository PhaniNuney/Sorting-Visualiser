"use client";

import { useEffect, useState } from "react";

export default function Sorting() {
  const [bars, setBars] = useState(
    Array.from({ length: 225 }, () => Math.floor(Math.random() * 100))
  );
  const [viewportHeight, setViewportHeight] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");

  useEffect(() => {
    setViewportHeight(window.innerHeight);

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const regenerateBars = () => {
    setBars(Array.from({ length: 225 }, () => Math.floor(Math.random() * 100)));
  };

  const bubbleSort = async () => {
    let arr = [...bars];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 3));
        }
      }
    }
  };

  const mergeSortHelper = async (
    arr: number[],
    start: number,
    end: number,
    setBars: (arr: number[]) => void
  ): Promise<void> => {
    if (start < end) {
      const middle = Math.floor((start + end) / 2);
      await mergeSortHelper(arr, start, middle, setBars); 
      await mergeSortHelper(arr, middle + 1, end, setBars); 
      await merge(arr, start, middle, end, setBars);
    }
  };

  const merge = async (
    arr: number[],
    start: number,
    middle: number,
    end: number,
    setBars: (arr: number[]) => void
  ): Promise<void> => {
    let temp = [...arr];
    let i = start,
      j = middle + 1,
      k = start;

    while (i <= middle && j <= end) {
      if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
      k++;
      await setBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    while (i <= middle) {
      arr[k++] = temp[i++];
      await setBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    while (j <= end) {
      arr[k++] = temp[j++];
      await setBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  };

  const mergeSort = async (
    arr: number[],
    setBars: (arr: number[]) => void
  ): Promise<void> => {
    await mergeSortHelper(arr, 0, arr.length - 1, setBars);
  };

  const insertionSort = async () => {
    let arr = [...bars];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
      setBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const selectionSort = async () => {
    let arr = [...bars];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        setBars([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
    }
  };

  const sort = async () => {
    switch (selectedAlgorithm) {
      case "bubbleSort":
        await bubbleSort();
        break;
      case "mergeSort":
        await mergeSort([...bars], setBars);
        break;
      case "insertionSort":
        await insertionSort();
        break;
      case "selectionSort":
        await selectionSort();
        break;
      default:
        console.log("No such algorithm");
    }
  };

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlgorithm(event.target.value);
  };

  return (
    <>
      <nav className="bg-black">
        <div className="flex justify-around w-full">
          <div className="flex justify-around">
            <h1 className="text-slate-300 font-mono text-4xl m-2">
              Sorting Visualiser
            </h1>
          </div>
          <div className="flex justify-around">
            <label className="text-slate-300 font-mono text-2xl p-2 m-2">
              Algorithm:
            </label>
            <select
              className="bg-slate-800 rounded m-4 text-slate-300"
              onChange={handleAlgorithmChange}
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="mergeSort">Merge Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="selectionSort">Selection Sort</option>
            </select>
            <button
              onClick={regenerateBars}
              className="bg-slate-500 hover:bg-slate-700 text-white text-xl font-mono rounded-lg p-2 m-3"
            >
              Generate New Array
            </button>
            <button
              onClick={sort}
              className="bg-slate-500 hover:bg-slate-700 text-white text-xl font-mono rounded-lg p-2 m-3"
            >
              Sort Array
            </button>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-end p-8 h-[calc(100vh-4rem)] w-full">
        {bars.map((bar, index) => {
          const barHeight = ((viewportHeight - 128) * bar) / 100;
          return (
            <div
              key={index}
              className="bg-slate-500 w-0.5 m-0.5"
              style={{ height: `${barHeight}px` }}
            ></div>
          );
        })}
      </div>
    </>
  );
}