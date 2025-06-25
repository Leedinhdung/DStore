@extends('layouts.master')
@section('title')
    Thùng rác
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">Thùng rác</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Danh mục</a></li>
                        <li class="breadcrumb-item active">Thùng rác</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex gap-3 align-content-center">
                        <a href="{{route('admin.category.index')}}"> <i class="fa-solid fa-arrow-left fs-20"></i></a>
                        <h5 class="card-title mb-0">Danh sách danh mục đã xóa</h5>
                    </div>
                </div>
                <div class="card-body">
                    <table id="scroll-horizontal" class="table nowrap align-middle" style="width:100%">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 10px;">
                                <div class="form-check">
                                    <input class="form-check-input fs-15" type="checkbox" id="checkAll" value="option">
                                </div>
                            </th>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Mô tả</th>
                            <th>Danh mục cha</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                       @if($categories->isNotEmpty())
                           @php
                               $i=0
                           @endphp
                           @foreach($categories as $cat)
                               @php
                                   $i++
                               @endphp

                               <tr>
                                   <th scope="row">
                                       <div class="form-check">
                                           <input class="form-check-input fs-15" type="checkbox" name="checkAll"
                                                  value="option1">
                                       </div>
                                   </th>
                                   <td>{{$i}}</td>
                                   <td>{{$cat->name}}</td>
                                   <td>{{strip_tags($cat->description)}}</td>
                                   <td>
                                    <span class="text-info">
                                        @if($cat->parent)
                                            {{$cat->parent->name}}
                                        @endif
                                    </span>
                                   </td>
                                   <td>
                                       {!!  $cat->status==='active'
                                           ? ' <span class="badge bg-primary">Hoạt động</span>'
                                           :' <span class="badge bg-danger">Không hoạt động</span>'
                                       !!}
                                   </td>
                                   <td>
                                       <div class="dropdown d-inline-block">
                                           <button class="btn btn-soft-secondary btn-sm dropdown" type="button"
                                                   data-bs-toggle="dropdown" aria-expanded="false">
                                               <i class="ri-more-fill align-middle"></i>
                                           </button>
                                           <ul class="dropdown-menu dropdown-menu-end">
                                               <li><a href="{{route('admin.category.restore',$cat->id)}}"
                                                      class="dropdown-item edit-item-btn"><i
                                                           class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                       Khôi phục</a></li>
                                               <li>
                                                   <a href="{{route('admin.category.destroy',$cat->id)}}"
                                                      class="dropdown-item remove-item-btn">
                                                       <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                       Xóa
                                                   </a>
                                               </li>
                                           </ul>
                                       </div>
                                   </td>
                               </tr>
                           @endforeach
                       @else
                           <tr>
                               <td colspan="7" class="text-center text-muted fs-18">Chưa có bản ghi nào được xóa</td>
                           </tr>
                       @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!--end col-->
        <div>
            {{ $categories->links() }}
        </div>
    </div>

@endsection
@section('style-libs')
    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css"/>
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css"/>

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">

@endsection
@section('script-libs')
    <!--datatable js-->
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

    <script src="{{asset('assets/js/pages/datatables.init.js')}}"></script>
@endsection
