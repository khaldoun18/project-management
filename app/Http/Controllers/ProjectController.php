<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $query = Project::query();

    $sortField=request("sort_field" ,'created_at');
    $sortDirection=request("sort_direction",'desc');

    if (request("name")) {
        $query->where('name', 'like', '%' . request("name") . '%');
    }

    if (request("status")) {
        $query->where('status', 'like', '%' . request("status") . '%');
    }

    $projects = $query->orderBy($sortField,$sortDirection)->paginate(10);

    return inertia("Projects/Index", [
        "projects" => ProjectResource::collection($projects),
        'queryParams' => request()->query() ?: null,
        'success'=>session('success'),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return inertia("Projects/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data=$request->validated();
        $image=$data['image']?? null;
        $data['created_by']=Auth::id();
        $data['updated_by']=Auth::id();

        if($image){
            $imagePath = $request->file('image')->store('images', 'public');

            $data['image_path'] = $imagePath;
        }
        Project::create($data);

        return to_route('project.index')->with('success','Project is created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia('Projects/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit',[
            'project'=>new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {

        $validatedData = $request->validated();


        $data = [];


        if ($request->hasFile('image')) {

            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }


            $imagePath = $request->file('image')->store('images', 'public');


            $data['image_path'] = $imagePath;
        }


        $data['updated_by'] = Auth::id();


        $project->update(array_merge($validatedData, $data));


        return redirect()->route('project.index')->with('success', 'Project is updated');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {

        if ($project->image_path) {

            Storage::disk('public')->delete($project->image_path);
        }


        $project->delete();


        return redirect()->route('project.index')->with('message', 'Project is deleted');
    }

}
