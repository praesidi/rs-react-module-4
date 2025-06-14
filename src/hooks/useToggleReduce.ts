import { useCallback, useReducer } from "react";

type StrNumBool = string | number | boolean;

type HookValue = Array<string | number> | undefined;

type HookReturnValue = [StrNumBool, (args0?: StrNumBool) => void];

type ActionType = { type: "TOGGLE" } | { type: "SET"; value: StrNumBool };

type State =
  | {
      currentValue: StrNumBool;
      isArray: false;
    }
  | {
      currentValue: StrNumBool;
      isArray: true;
      arrayIndex: number;
      array: (string | number)[];
    };

const createInitialState = (value: HookValue): State => {
  if (Array.isArray(value) && value.length > 0) {
    return {
      currentValue: value[0],
      isArray: true,
      arrayIndex: 0,
      array: value,
    };
  }

  return {
    currentValue: false,
    isArray: false,
  };
};

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE": {
      if (state.isArray) {
        let updatedArrayIndex = state.arrayIndex;

        if (state.arrayIndex >= state.array.length - 1) {
          updatedArrayIndex = 0;
        } else {
          updatedArrayIndex++;
        }

        return {
          ...state,
          currentValue: state.array[updatedArrayIndex],
          arrayIndex: updatedArrayIndex,
        };
      }

      return {
        ...state,
        currentValue: !state.currentValue,
      };
    }

    case "SET": {
      if (state.isArray && typeof action.value !== "boolean") {
        const indexOfToggleValue = state.array.indexOf(action.value);

        if (indexOfToggleValue !== -1) {
          return {
            ...state,
            arrayIndex: indexOfToggleValue,
            currentValue: state.array[indexOfToggleValue],
          };
        }

        return {
          ...state,
          arrayIndex: 0,
          currentValue: state.array[0],
        };
      }

      return {
        ...state,
        currentValue: !!action.value,
      };
    }

    default:
      return state;
  }
};

export const useToggle = (value?: HookValue): HookReturnValue => {
  const [state, dispatch] = useReducer(reducer, value, createInitialState);

  const toggle = useCallback((toggleValue: StrNumBool | undefined) => {
    if (toggleValue === undefined) {
      dispatch({ type: "TOGGLE" });
    } else {
      dispatch({ type: "SET", value: toggleValue });
    }
  }, []);

  return [state.currentValue, toggle];
};
