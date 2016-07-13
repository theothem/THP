<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PagesController extends Controller
{
    public function index(){
    	return view('index');
    }

    public function index2(){
    	return view('index2');
    }

    public function oldslider(){
    	return view('oldslider');
    }
}
