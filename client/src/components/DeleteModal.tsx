import React from "react";
import classNames from "classnames";
import { Transition } from "react-transition-group";
import CloseSvgComponent from "assets/svg/close";
type Props = {
  inProp: boolean;
  taskStatus: "completed" | "uncompleted";
  onDelete: () => void;
  onCancel: () => void;
};
const DURATION = 300;
const defaultStyle = {
  transition: `all ${DURATION}ms ease-in-out`,
  opacity: 0,
  display: "none",
  left: "50%",
  top: "50%",
};
const transitionStyles = {
  unmounted: { opacity: 0, display: "none" },
  entering: { opacity: 1, display: "block" },
  entered: { opacity: 1, display: "block" },
  exiting: { opacity: 0, display: "none" },
  exited: { opacity: 0, display: "none" },
};
const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  display: "none",
};

const overlayTransitionStyles = {
  unmounted: { opacity: 0, bottom: "-180px" },
  entering: { opacity: 0.85, display: "block" },
  entered: { opacity: 0.85, display: "block" },
  exiting: { opacity: 0, bottom: "-180px" },
  exited: { opacity: 0, bottom: "-180px" },
};
const DeleteModal: React.FC<Props> = ({
  inProp,
  taskStatus,
  onCancel,
  onDelete,
}) => {
  const buttonStyle = classNames(
    "text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg",
    {
      "bg-red-600": taskStatus === "uncompleted",
      "bg-green-600": taskStatus === "completed",
    }
  );
  return (
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          <div
            onClick={onCancel}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state],
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className="bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
          >
            <div className="flex flex-col h-full justify-between ">
              <section className="flex flex-row justify-between">
                <p className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal">
                  {taskStatus === "uncompleted" &&
                    "This task is not completed, delete?"}
                  {taskStatus === "completed" &&
                    "Congrats on completing the task!"}
                  {taskStatus === "completed" && (
                    <p className="text-2xl">&#128540;</p>
                  )}
                  {taskStatus === "uncompleted" && (
                    <p className="text-2xl">&#128548;</p>
                  )}
                </p>
                <CloseSvgComponent onClick={onCancel} />
              </section>
              <button onClick={onDelete} className={buttonStyle}>
                {taskStatus === "completed"
                  ? "Delete completed task"
                  : "Delete uncompleted task"}
              </button>
            </div>
          </div>
        </>
      )}
    </Transition>
  );
};
export default DeleteModal;
