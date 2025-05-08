<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Incident::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'visible' => 'required|boolean',
        ]);

        $incident = Incident::create($request->all());
        $incident->titre = $request->input('titre');
        $incident->description = $request->input('description');
        $incident->visible = $request->input('visible');
        $incident->save();
    
        return response()->json($incident);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Incident::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $incident = Incident::findOrFail($id);
        return view('incidents.form', compact('incident'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Mettre à jour l'incident existant
        $incident = Incident::findOrFail($id);
        $incident->update($request->all());
        return response()->json($incident);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Supprimer un incident
        Incident::destroy($id);
        return response()->json(null, 204);
    }
}
