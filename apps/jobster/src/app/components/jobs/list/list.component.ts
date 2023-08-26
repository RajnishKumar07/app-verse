import { Component, OnInit, OnDestroy, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { DialogModule, Dialog } from "@angular/cdk/dialog";
import { ManageComponent } from "../manage/manage.component";
import { ConfirmComponent, CoreService, LoaderService } from "@app-verse/shared";
@Component({
  selector: "app-verse-list",
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  allJobs!: {
    _id: string;
    company: string;
    position: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];

  dialogRef!: any;

  constructor(
    private http: HttpClient,
    private dialog: Dialog,
    public coreService: CoreService,
    public loaderService: LoaderService
  ) {}
  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  ngOnInit(): void {
    this.getAllJobs();
  }

  manageJobs(id?: string) {
    if (id) {
      this.http.get(`/jobs/${id}`).subscribe((res: any) => {
        if (res?.job) {
          this.dialogRef = this.dialog.open(ManageComponent, {
            data: {
              id,
              formData: res.job,
            },
            minWidth: "25rem",
            hasBackdrop: true,
          });
          this.dialogRef.closed.subscribe((result: any) => {
            if (result) {
              this.getAllJobs();
            }
          });
        }
        console.log("manage", res);
      });
    } else {
      this.dialogRef = this.dialog.open(ManageComponent, {
        minWidth: "25rem",
        hasBackdrop: true,
      });
      this.dialogRef.closed.subscribe((result: any) => {
        if (result) {
          this.getAllJobs();
        }
      });
    }
  }

  deleteJob(id: string) {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        confirmationTitle: "Confirmation",
        confirmationMessage: "Do you want to delete this job?",
      },
      width: "25rem",
    });
    this.dialogRef.closed.subscribe((result: string) => {
      if (result === "yes") {
        this.http.delete(`/jobs/${id}`).subscribe((resp) => {
          this.coreService.showToast("success", "Job deleted successfully");
          this.getAllJobs();
        });
      }
    });
  }

  trackByFn(item: any) {
    return item._id;
  }

  private getAllJobs() {
    this.http
      .get<{
        jobs: {
          _id: string;
          company: string;
          position: string;
          status: string;
          createdBy: string;
          createdAt: string;
          updatedAt: string;
          __v: number;
        }[];
      }>("/jobs")
      .subscribe((res: any) => {
        this.allJobs = res.jobs;
      });
  }
}
