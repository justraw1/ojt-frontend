<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware(['auth:sanctum','api'])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('api')->group(function() {
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/upload-file", [FilesController::class, "upload"]);
    Route::post("/register", [AuthController::class, "register"]);
    Route::get("/fetch-documents", [FilesController::class, "fetchDocuments"]);
    Route::post("/delete-document", [FilesController::class, "deleteDocument"]);
    Route::get("/fetch-document-info/{file_id}", [FilesController::class, "fetchDocumentInfo"]);
    Route::post("/update-document", [FilesController::class, "updateDocument"]);
    Route::get("/fetch-pending-count", [FilesController::class, "fetchPendingCount"]);
    Route::get("/fetch-pending-documents", [FilesController::class, "fetchPendingDocuments"]);
    Route::post("/accept-document", [FilesController::class, "acceptDocument"]);
    Route::post("/reject-document", [FilesController::class, "rejectDocument"]);
});
