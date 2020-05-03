import React from "react";
import { CircularButton } from "../atoms";

interface ICounter {
  count: number;
  increment: (num: number) => void;
}

export default function Counter(props: ICounter) {
  const { count, increment } = props;
  return (
    <>
      <CircularButton icon="subtract" onClick={() => increment(-1)} />
      <span> {count} </span>
      <CircularButton icon="add" onClick={() => increment(1)} />
    </>
  );
}
