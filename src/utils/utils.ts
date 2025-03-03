

export const getAllItemsFromLocalStorage = () => {

    const allItems: { [key: string]: any } = {};
    const tags: Set<string> = new Set();

    for (let i = 0; i < localStorage.length; i++) {
        const key: any = localStorage.key(i);
        const value: any = localStorage.getItem(key);

        if (value) {
            try {
                const parsedValue = JSON.parse(value);
                allItems[key] = parsedValue;

                if (parsedValue.tag) {
                    tags.add(parsedValue.tag);
                }
            } catch (e) {
                allItems[key] = value;
            }
        }
    }
    return (
        { allItems, tags }
    )
}


export const sortItems = (allItems: { [key: string]: any }) => {
    type Priority = "High" | "Medium" | "Low";
    return Object.fromEntries(
        Object.entries(allItems).sort(([, itemA], [, itemB]) => {
            if (itemA.status === "not-completed" && itemB.status !== "not-completed") {
                return -1;
            }
            if (itemA.status !== "not-completed" && itemB.status === "not-completed") {
                return 1;
            }

            const priorityorder: { [key in Priority]: number } = { High: 3, Medium: 2, Low: 1 };
            if (priorityorder[itemA.priority as Priority] > priorityorder[itemB.priority as Priority]) return -1;
            if (priorityorder[itemB.priority as Priority] > priorityorder[itemA.priority as Priority]) return 1;


            const dateA = new Date(itemA.date);
            const dateB = new Date(itemB.date);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;


            const timeA = itemA.fromtime && itemA.totime ? `${itemA.fromtime} - ${itemA.totime}` : "";
            const timeB = itemB.fromtime && itemB.totime ? `${itemB.fromtime} - ${itemB.totime}` : "";

            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;

            return 0;
        })
    );
}


export const applyFilters = (items: { [key: string]: any },
    priorityFilter: string,
    dateFilter: string,
    tagFilter: any[],
    statusFilter: string) => {
    let filtered = { ...items };
        console.log("Hello");
    if (priorityFilter !== "All") {
        filtered = Object.fromEntries(
            Object.entries(filtered).filter(([_, item]) => item.priority === priorityFilter)
        );
    }

    if (dateFilter) {
        filtered = Object.fromEntries(
            Object.entries(filtered).filter(([_, item]) => item.date === dateFilter)
        );
    }

    if (tagFilter.length > 0) {  // Checking if any tags are selected
        filtered = Object.fromEntries(
            Object.entries(filtered).filter(
                ([_, item]) => tagFilter.some((selectedTag) => selectedTag.value === item.tag)
            )
        );
    }

    if (statusFilter !== "All") {
        filtered = Object.fromEntries(
            Object.entries(filtered).filter(([_, item]) => item.status === statusFilter)
        );
    }
    return filtered;

};

export const getPriorityClass = (priority: string): string => {
    switch (priority) {
        case "Low":
            return "priority-low";
        case "Medium":
            return "priority-medium";
        case "High":
            return "priority-high";
        default:
            return "";
    }
};

export const getStatusClass = (status: string) => {
    switch (status) {
        case "not-completed":
            return "d-not-completed";
        case "completed":
            return "d-completed";
        default:
            return "";
    }
};




