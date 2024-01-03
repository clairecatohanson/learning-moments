export const FilterBar = ({
    allTopics,
    setSearchbarInput,
    setTopicDropdownSelection,
}) => {
    return (
        <div className="filter-bar">
            <div className="filter-dropdown">
                <label htmlFor="topic-dropdown" className="dropdown-label">
                    <i className="fa-solid fa-filter"></i>
                </label>
                <select
                    className="dropdown-menu"
                    defaultValue="0"
                    id="topic-dropdown"
                    onChange={(event) => {
                        setTopicDropdownSelection(event.target.value)
                    }}
                >
                    <option value="0">Show All</option>
                    {allTopics.map((topic) => {
                        return (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="search-bar-input">
                <i className="fa-solid fa-magnifying-glass search-bar-label"></i>
                <input
                    className="search-bar"
                    name="search-bar"
                    placeholder="Search..."
                    type="text"
                    onChange={(event) => {
                        setSearchbarInput(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}
