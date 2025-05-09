import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { Label } from "@/types/label";
import APIManager from "@/utils/APIManager";

interface TodoEditProps {
    task: Task;
    switchEdit: () => void;
}

export default function TodoEdit({ task, switchEdit }: TodoEditProps) {
    const [editedTask, setEditedTask] = useState(task);
    const [labels, setLabels] = useState<Label[]>([]);
    const [labelsSearchQuery, setLabelsSearchQuery] = useState("");

    useEffect(() => {
        const fetchLabels = async () => {
            const apiManager = APIManager.getInstance();
            const fetchedLabels = await apiManager.getLabels();
            setLabels(fetchedLabels);
        };
        fetchLabels();
    }, []);

    const handleSave = async () => {
        try {
            const apiManager = APIManager.getInstance();
            await apiManager.updateTask(editedTask.taskid, editedTask);
            console.log("Task saved successfully:", editedTask);
        } catch (error) {
            console.error("Error saving task:", error);
        }
        switchEdit();
    };

    return (
        <div className="flex-1 relative shrink-0 w-[26rem] h-full bg-white shadow-md rounded-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="px-2">
                    <i className="w-[1.5rem] h-[1.5rem] align-text-top i-mdi-pencil" />
                </div>
                <h2 className="grow text-2xl font-bold"> [編集中] {editedTask.title}
                </h2>
                <button
                    className="px-2 cursor-pointer text-red-500 hover:text-red-600"
                    onClick={switchEdit}
                >
                    <i className="i-mdi-close w-[1.5rem] h-[1.5rem]"></i>
                </button>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">タイトル:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">期限:</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={editedTask.due_date ? editedTask.due_date.toISOString().split('T')[0] : ""}
                    onChange={(e) => setEditedTask({ ...editedTask, due_date: new Date(e.target.value) })}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">ラベル:</label>
                <input
                    type="text"
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="ラベルを検索..."
                    value={labelsSearchQuery}
                    onChange={(e) => setLabelsSearchQuery(e.target.value)}
                />
                <div className="w-full p-2 border rounded h-40 overflow-y-auto">
                    {labels
                        .filter((label) =>
                            label.label_name.toLowerCase().includes(labelsSearchQuery.toLowerCase())
                        )
                        .map((label) => (
                        <div key={label.label_id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`label-${label.label_id}`}
                                className="mr-2"
                                checked={editedTask.labels.includes(label.label_id)}
                                onChange={(e) => {
                                    const updatedLabels = e.target.checked
                                        ? [...editedTask.labels, label.label_id]
                                        : editedTask.labels.filter((id) => id !== label.label_id);
                                    setEditedTask({ ...editedTask, labels: updatedLabels });
                                }}
                            />
                            <label htmlFor={`label-${label.label_id}`}>{label.label_name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">説明:</label>
                <textarea
                    className="w-full p-2 border rounded"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">優先度:</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={editedTask.priority || ""}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: parseInt(e.target.value, 10) })}
                />
            </div>
            <button
                className="flex items-center justify-center absolute bottom-4 right-4 bg-green-500 text-white p-2 w-12 h-12 rounded-full shadow-md hover:bg-green-600"
                onClick={handleSave}
            >
                <i className="i-mdi-content-save w-[1.5rem] h-[1.5rem]"></i>
            </button>
        </div>
    );
}