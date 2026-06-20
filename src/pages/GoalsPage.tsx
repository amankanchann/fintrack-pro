import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/common/Card";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from "uuid";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
}

function GoalsPage() {
  const { theme } = useTheme();

  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals =
      localStorage.getItem("goals");

    return savedGoals
      ? JSON.parse(savedGoals)
      : [];
  });

  const [title, setTitle] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [savedAmount, setSavedAmount] =
    useState("");

  const [editingGoalId, setEditingGoalId] =
    useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const handleSubmit = () => {
    if (
      !title ||
      !targetAmount ||
      !savedAmount
    ) {
      return;
    }

    if (editingGoalId) {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === editingGoalId
            ? {
                ...goal,
                title,
                targetAmount:
                  Number(targetAmount),
                savedAmount:
                  Number(savedAmount),
              }
            : goal
        )
      );

      setEditingGoalId(null);
    } else {
      const newGoal: Goal = {
        id: uuidv4(),
        title,
        targetAmount:
          Number(targetAmount),
        savedAmount:
          Number(savedAmount),
      };

      setGoals((prev) => [
        newGoal,
        ...prev,
      ]);
    }

    setTitle("");
    setTargetAmount("");
    setSavedAmount("");
  };

  const handleDeleteGoal = (
    id: string
  ) => {
    setGoals((prev) =>
      prev.filter(
        (goal) => goal.id !== id
      )
    );
  };

  const handleEditGoal = (
    goal: Goal
  ) => {
    setEditingGoalId(goal.id);

    setTitle(goal.title);

    setTargetAmount(
      goal.targetAmount.toString()
    );

    setSavedAmount(
      goal.savedAmount.toString()
    );
  };


  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Financial Goals
        </h1>

        <Card className="mb-6">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Goal Name"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="rounded-lg border p-3"
            />

            <input
              type="number"
              placeholder="Target Amount"
              value={targetAmount}
              onChange={(e) =>
                setTargetAmount(
                  e.target.value
                )
              }
              className="rounded-lg border p-3"
            />

            <input
              type="number"
              placeholder="Saved Amount"
              value={savedAmount}
              onChange={(e) =>
                setSavedAmount(
                  e.target.value
                )
              }
              className="rounded-lg border p-3"
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`
              mt-4
              rounded-lg
              px-4
              py-2
              text-white
              ${
                theme === "light"
                  ? "bg-vintage-brown"
                  : "bg-neon-purple"
              }
            `}
          >
            {editingGoalId
              ? "Update Goal"
              : "Add Goal"}
          </button>
        </Card>
              
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => {
            const progress =
              Math.min(
                (goal.savedAmount /
                  goal.targetAmount) *
                  100,
                100
              );

            const remaining =
              goal.targetAmount -
              goal.savedAmount;

            return (
              <Card key={goal.id}>
                <h2
                  className={`
                    text-xl
                    font-bold
                    ${
                      theme === "light"
                        ? "text-vintage-navy"
                        : "text-white"
                    }
                  `}
                >
                  {goal.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  ₹
                  {goal.savedAmount.toLocaleString()}
                  {" / "}₹
                  {goal.targetAmount.toLocaleString()}
                </p>

                <div className="mt-4 h-4 rounded-full bg-gray-200">
                  <div
                    className={`
                      h-4
                      rounded-full
                      ${
                        theme === "light"
                          ? "bg-vintage-brown"
                          : "bg-neon-purple-light"
                      }
                    `}
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span>
                    {progress.toFixed(0)}%
                  </span>

                  <span>
                    Remaining ₹
                    {remaining.toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      handleEditGoal(
                        goal
                      )
                    }
                    className={`
                      rounded-lg
                      px-3
                      py-1
                      text-white
                      ${
                        theme === "light"
                          ? "bg-vintage-brown"
                          : "bg-neon-purple"
                      }
                    `}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteGoal(
                        goal.id
                      )
                    }
                    className={`
                      rounded-lg
                      border
                      px-3
                      py-1
                      ${
                        theme === "light"
                          ? "border-vintage-brown text-vintage-brown"
                          : "border-neon-purple text-neon-purple-light"
                      }
                    `}
                  >
                    Delete
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export default GoalsPage;