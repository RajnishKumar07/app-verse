import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { CoreService } from "../../../core/services/core.service";
import { ErrorComponent } from "@app-verse/shared/src/lib/error";

const enum STATUS {
  pending = "pending",
  interview = "interview",
  declined = "declined",
}

@Component({
  selector: "app-verse-manage",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  entityId!: string;
  jobForm!: FormGroup;
  isSubmited = false;
  allStatus = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Interview",
      value: "interview",
    },
    {
      label: "Declined",
      value: "declined",
    },
  ];

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.id) {
      this.entityId = this.data.id;
      this.jobForm.patchValue(this.data.formData);
    }
  }

  /**
   * To close popup
   */
  close(res?: any): void {
    this.dialogRef.close(res);
  }

  /**
   * To submit job
   */
  submit(): void {
    this.isSubmited = true;
    if (this.jobForm.valid) {
      const data = this.jobForm.value;
      let url = "/jobs";
      let methods = "post";
      let httpReq: Observable<any>;
      httpReq = this.http.post(url, data);
      if (this.entityId) {
        url = `${url}/${this.entityId}`;
        methods = "patch";
        httpReq = this.http.patch(url, data);
      }

      httpReq.subscribe((res) => {
        if (res || res.job) {
          const msg = this.entityId
            ? "Job created successfully."
            : "Job updated Successfully";
          this.coreService.showToast("success", msg);
          this.dialogRef.close(res);
        }
      });
    }
  }

  private initializeForm(): void {
    this.jobForm = this.fb.group({
      company: ["", Validators.required],
      position: ["", Validators.required],
      status: [this.allStatus[0].value, Validators.required],
    });
  }
}
