import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'] 
})
export class EditarProductoComponent implements OnInit {
  producto: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params: { [key: string]: any } = this.activatedRoute.snapshot.params;
    const id = params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error?.mensaje || 'Error al cargar el producto', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const params: { [key: string]: any } = this.activatedRoute.snapshot.params;
    const id = params['id'];

    if (this.producto) { 
      this.productoService.update(id, this.producto).subscribe(
        data => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error(err.error?.message || 'Error al actualizar el producto', 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }
      );
    } else {
      this.toastr.error('El producto no está disponible para actualizar', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }
  volver(): void {
    this.router.navigate(['/']);
  }
}
