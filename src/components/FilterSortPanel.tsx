import React, { useEffect, useState } from 'react';

import { FilterOptions, SortOptions } from "../types/filterSortOptions";
import APIManager from "../utils/APIManager";
import { Label } from "../types/label";

interface FilterSortPanelProps {
    onApply: (filters: FilterOptions, sort: SortOptions) => void;
    initialFilters: FilterOptions;
    initialSort: SortOptions;
}

const FilterSortPanel: React.FC<FilterSortPanelProps> = ({ onApply, initialFilters, initialSort }) => {
    const [isComplete, setIsComplete] = useState<"any" | "true" | "false">(initialFilters.is_complete);
    const [isDeleted, setIsDeleted] = useState<"any" | "true" | "false">(initialFilters.is_deleted);
    const [labels, setLabels] = useState<string[]>(initialFilters.labels);
    const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
    const [orderBy, setOrderBy] = useState<"title" | "due_date" | "priority" | "created_at">(initialSort.orderBy);

    useEffect(() => {
        const fetchLabels = async () => {
            const fetchedLabels = await APIManager.getInstance().getLabels();
            setAvailableLabels(fetchedLabels);
        };
        fetchLabels();
    }, []);
    
    const handleLabelChange = (label: string) => {
        setLabels((prev) =>
            prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
        );
    };

    const handleApply = () => {
        const filters = { is_complete: isComplete, is_deleted: isDeleted, labels };
        const sort = { orderBy };
        onApply(filters, sort);
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">絞り込み・並び替え</h3>
            <div className="mb-4">
                <label className="block mb-2">絞り込み条件:</label>
                <div className="mb-4">
                    <label className="block mb-2">完了状態 (is_complete):</label>
                    <select
                        className="border rounded p-2 w-full"
                        value={isComplete}
                        onChange={(e) => setIsComplete(e.target.value as "any" | "true" | "false")}
                    >
                        <option value="any">すべて</option>
                        <option value="true">完了</option>
                        <option value="false">未完了</option>
                    </select>
                    <label className="block mb-2">削除状態 (is_deleted):</label>
                    <select
                        className="border rounded p-2 w-full"
                        value={isDeleted}
                        onChange={(e) => setIsDeleted(e.target.value as "any" | "true" | "false")}
                    >
                        <option value="any">すべて</option>
                        <option value="true">削除済み</option>
                        <option value="false">未削除</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">ラベル:</label>
                    <div className="flex flex-wrap gap-2">
                        {availableLabels.map((label) => (
                            <label key={label.label_id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={labels.includes(label.label_id)}
                                    onChange={() => handleLabelChange(label.label_id)}
                                />
                                {label.label_name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2">並び替え条件:</label>
                <select
                    className="border rounded p-2 w-full"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value as "title" | "due_date" | "priority" | "created_at")}
                >
                    <option value="title">タイトル</option>
                    <option value="due_date">締め切り</option>
                    <option value="priority">優先度</option>
                    <option value="created_at">作成日</option>
                </select>
            </div>
            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleApply}
            >
                適用
            </button>
        </div>
    );
};

export default FilterSortPanel;