type Props = {
    projects: any[];
    selectedProjects: number[];
    toggleProject: (id: number) => void;
};

export default function ProjectSelector({
    projects,
    selectedProjects,
    toggleProject
}: Props) {
    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-base font-semibold">Projects</h2>
                <p className="text-sm text-[#7D8590]">Select projects to include</p>
            </div>

            <div className="border-t border-[#30363D]" />

            <div className="space-y-3">
                {projects.map(project => (
                    <label
                        key={project.id}
                        className="flex items-center justify-between text-sm cursor-pointer"
                    >
                        <span>{project.name}</span>

                        <input
                            type="checkbox"
                            checked={selectedProjects.includes(project.id)}
                            onChange={() => toggleProject(project.id)}
                        />
                    </label>
                ))}
            </div>

        </div>
    );
}