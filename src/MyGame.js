import React, { useState, useEffect, useRef } from "react";
import Blank from "./blank.png";
import Food from "./food.png";
import Snake from "./snake.png";

const MyGame = () => {

  let grid = [];
  for (let i = 0; i < 10; i++) {
    grid.push([]);
    for (let j = 0; j < 10; j++) {
      grid[i].push("null");
    }
  }

  const foodPos = () => {
    const pos = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
    return pos;
  };

  const [rows, setRows] = useState(grid);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [dir, setDir] = useState("up");
  const [food, setFood] = useState(foodPos);

  const changeDir = ({keyCode}) => {
    switch(keyCode){
      case 37:
        setDir("left");
        break;
      
      case 38:
        setDir("up");
        break;
      
      case 39:
        setDir("right");
        break;

      case 40:
        setDir("down");
        break;

      default:
        break;
    }
  }

  document.addEventListener("keydown", changeDir, true);

  const viewSnake = () =>{
    const newRows = grid;
    snake.forEach(c => {
      newRows[c.x][c.y] = "snake";
    })
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  }


  const moveSnake = () => {
    const newSnake = [];
    //console.log(dir);
    switch(dir){
      case "right":
        newSnake.push({x: snake[0].x, y:(snake[0].y + 1)% 10})
        break;
      case "left":
        newSnake.push({x: snake[0].x, y:(snake[0].y - 1 + 10)% 10})
        break;
      case "up":
        newSnake.push({x: (snake[0].x - 1 + 10) % 10, y: snake[0].y})
        break;
      case "down":
        newSnake.push({x: (snake[0].x + 1) % 10, y: snake[0].y})
        break;
      default:
        break;
    }
    snake.forEach(c => {
      newSnake.push(c);
    })
    
    if(snake[0].x === food.x && snake[0].y === food.y) {
        setFood(foodPos);
    }else {
        newSnake.pop();
    }
    setSnake(newSnake);
    viewSnake();
  }


  useInterval(moveSnake, 100);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }


  const board = rows.map((row, id) => (
    <div key={id}>
      {row.map((e, index) => {
        switch (e) {
          case "food":
            return (<img key={index} src={Food} alt="failed to load"/>);
          case "null":
            return (<img key={index} src={Blank} alt="failed to load"/>);
          case "snake":
            return (<img key={index} src={Snake} alt="failed to load"/>);
          default:
            break;
        }
        return 0;
      })}
    </div>
  ));
  return (
  <div>
    <ul>
      {board}
    </ul>
  </div>
  );
};

export default MyGame;
