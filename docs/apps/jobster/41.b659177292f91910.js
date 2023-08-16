"use strict";(self.webpackChunkjobster=self.webpackChunkjobster||[]).push([[41],{41:(j,m,c)=>{c.r(m),c.d(m,{JOBS_ROUTE:()=>C});var d=c(6814),u=c(2538),s=c(95),t=c(9468),p=c(9862),g=c(5749);function h(i,n){if(1&i&&(t.TgZ(0,"div",15),t._UZ(1,"input",16),t.TgZ(2,"label",17),t._uU(3),t.qZA()()),2&i){const e=n.$implicit,o=n.index;t.xp6(1),t.Q6J("id","status"+o)("value",e.value),t.xp6(1),t.Q6J("for","status"+o),t.xp6(1),t.hij(" ",e.label," ")}}let f=(()=>{class i{constructor(e,o,a,l,r){this.data=e,this.dialogRef=o,this.fb=a,this.http=l,this.coreService=r,this.allStatus=[{label:"Pending",value:"pending"},{label:"Interview",value:"interview"},{label:"Declined",value:"declined"}]}ngOnInit(){this.initializeForm(),this.data?.id&&(this.entityId=this.data.id,this.jobForm.patchValue(this.data.formData))}close(e){this.dialogRef.close(e)}submit(){const e=this.jobForm.value;let l,o="/jobs";l=this.http.post(o,e),this.entityId&&(o=`${o}/${this.entityId}`,l=this.http.patch(o,e)),l.subscribe(r=>{(r||r.job)&&(this.coreService.showToast("success",this.entityId?"Job created successfully.":"Job updated Successfully"),this.dialogRef.close(r)),console.log("form--------\x3e",r)})}initializeForm(){this.jobForm=this.fb.group({company:["",s.kI.required],position:["",s.kI.required],status:[this.allStatus[0].value,s.kI.required]})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(u.Kt),t.Y36(u.zj),t.Y36(s.qu),t.Y36(p.eN),t.Y36(g.p))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-verse-manage"]],standalone:!0,features:[t.jDz],decls:22,vars:4,consts:[[1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"modal-body"],[3,"formGroup"],[1,"my-2"],["for","company"],["type","text","placeholder","Company Name","formControlName","company",1,"form-control","form-control-lg"],["for","position"],["type","text","placeholder","Position","formControlName","position",1,"form-control","form-control-lg"],["class","form-check form-check-inline",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click"],[1,"form-check","form-check-inline"],["type","radio","formControlName","status",1,"form-check-input",3,"id","value"],[1,"form-check-label",3,"for"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h5",3),t._uU(4),t.qZA()(),t.TgZ(5,"div",4)(6,"form",5)(7,"div",6)(8,"label",7),t._uU(9,"Company Name"),t.qZA(),t._UZ(10,"input",8),t.qZA(),t.TgZ(11,"div",6)(12,"label",9),t._uU(13,"Position"),t.qZA(),t._UZ(14,"input",10),t.qZA(),t.TgZ(15,"div"),t.YNc(16,h,4,4,"div",11),t.qZA()()(),t.TgZ(17,"div",12)(18,"button",13),t.NdJ("click",function(){return o.close()}),t._uU(19," Close "),t.qZA(),t.TgZ(20,"button",14),t.NdJ("click",function(){return o.submit()}),t._uU(21),t.qZA()()()()),2&e&&(t.xp6(4),t.Oqu(o.entityId?"Edit Job":"Create Job"),t.xp6(2),t.Q6J("formGroup",o.jobForm),t.xp6(10),t.Q6J("ngForOf",o.allStatus),t.xp6(5),t.hij(" ",o.entityId?"Update":"Submit"," "))},dependencies:[d.ez,d.sg,s.u5,s._Y,s.Fj,s._,s.JJ,s.JL,s.UX,s.sg,s.u]}),i})();var b=c(9093),v=c(4609);function Z(i,n){1&i&&(t.TgZ(0,"div")(1,"div",2)(2,"div",6),t._UZ(3,"img",7),t.TgZ(4,"p",8),t._uU(5,"No data found"),t.qZA()()()())}const y=function(i,n,e){return{"text-bg-primary":i,"text-bg-warning":n,"text-bg-danger":e}};function _(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"div",11)(1,"div",12)(2,"div",13)(3,"h5",14),t._uU(4),t.ALo(5,"titlecase"),t.qZA()(),t.TgZ(6,"div",15)(7,"div",16)(8,"span"),t._uU(9,"Company "),t.qZA(),t._uU(10," : "),t.TgZ(11,"span"),t._uU(12),t.ALo(13,"titlecase"),t.qZA()(),t.TgZ(14,"div",17)(15,"span",18),t._uU(16),t.ALo(17,"titlecase"),t.qZA(),t.TgZ(18,"div",19),t._uU(19),t.ALo(20,"date"),t.qZA()(),t.TgZ(21,"div",20)(22,"button",21),t.NdJ("click",function(){const l=t.CHM(e).$implicit,r=t.oxw(2);return t.KtG(r.manageJobs(l._id))}),t._UZ(23,"i",22),t.qZA(),t.TgZ(24,"button",23),t.NdJ("click",function(){const l=t.CHM(e).$implicit,r=t.oxw(2);return t.KtG(r.deleteJob(l._id))}),t._UZ(25,"i",24),t.qZA()()()()()}if(2&i){const e=n.$implicit;t.xp6(4),t.hij(" ",t.lcZ(5,5,e.position)," "),t.xp6(8),t.hij(" ",t.lcZ(13,7,e.company),""),t.xp6(3),t.Q6J("ngClass",t.kEZ(13,y,"interview"===e.status,"pending"===e.status,"declined"===e.status)),t.xp6(1),t.Oqu(t.lcZ(17,9,e.status)),t.xp6(3),t.hij(" Created At : ",t.lcZ(20,11,e.createdAt)," ")}}function J(i,n){if(1&i&&(t.TgZ(0,"div",0)(1,"div",9),t.YNc(2,_,26,17,"div",10),t.qZA()()),2&i){const e=t.oxw();t.xp6(2),t.Q6J("ngForOf",e.allJobs)("ngForTrackBy",e.trackByFn)}}const C=[{path:"",component:(()=>{class i{constructor(e,o,a,l){this.http=e,this.dialog=o,this.coreService=a,this.loaderService=l}ngOnDestroy(){this.dialogRef?.close()}ngOnInit(){this.getAllJobs()}manageJobs(e){e?this.http.get(`/jobs/${e}`).subscribe(o=>{o?.job&&(this.dialogRef=this.dialog.open(f,{data:{id:e,formData:o.job},minWidth:"25rem",hasBackdrop:!0}),this.dialogRef.closed.subscribe(a=>{a&&this.getAllJobs()})),console.log("manage",o)}):(this.dialogRef=this.dialog.open(f,{minWidth:"25rem",hasBackdrop:!0}),this.dialogRef.closed.subscribe(o=>{o&&this.getAllJobs()}))}deleteJob(e){this.dialogRef=this.dialog.open(b.X,{data:{confirmationTitle:"Confirmation",confirmationMessage:"Do you want to delete this job?"},width:"25rem"}),this.dialogRef.closed.subscribe(o=>{"yes"===o&&this.http.delete(`/jobs/${e}`).subscribe(a=>{this.coreService.showToast("success","Job deleted successfully"),this.getAllJobs()})})}trackByFn(e){return e._id}getAllJobs(){this.http.get("/jobs").subscribe(e=>{this.allJobs=e.jobs})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(p.eN),t.Y36(u.Vq),t.Y36(g.p),t.Y36(v.D))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-verse-list"]],standalone:!0,features:[t.jDz],decls:7,vars:2,consts:[[1,"container","my-3"],[4,"ngIf"],[1,"row","justify-content-center"],[1,"col-12","col-md-4"],[1,"btn","btn-outline-primary","w-100",3,"click"],["class","container my-3",4,"ngIf"],[1,"col-4","text-center"],["src","assets/images/icons/noData.svg","alt","no data found"],[1,"text-muted","fs-1","fw-bold"],[1,"row","row-cols-1","row-cols-md-2","row-cols-lg-3","g-2","align-items-center","justify-content-center"],["class","col",4,"ngFor","ngForOf","ngForTrackBy"],[1,"col"],[1,"card"],[1,"card-header"],[1,"text-center"],[1,"card-body"],[1,"h5","card-title"],[1,"d-flex","justify-content-between","align-items-center","gap-2"],[1,"badge","p-2",3,"ngClass"],[1,"text-muted"],[1,"d-flex","justify-content-center","gap-3","mt-4"],[1,"btn","btn-outline-primary","rounded-5",3,"click"],[1,"fa","fa-pencil"],[1,"btn","btn-outline-danger","rounded-5",3,"click"],[1,"fa","fa-trash"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,Z,6,0,"div",1),t.TgZ(2,"div",2)(3,"div",3)(4,"button",4),t.NdJ("click",function(){return o.manageJobs()}),t._uU(5," Create Job "),t.qZA()()()(),t.YNc(6,J,3,2,"div",5)),2&e&&(t.xp6(1),t.Q6J("ngIf",!(null!=o.allJobs&&o.allJobs.length)),t.xp6(5),t.Q6J("ngIf",null==o.allJobs?null:o.allJobs.length))},dependencies:[d.ez,d.mk,d.sg,d.O5,d.rS,d.uU,u.Su]}),i})()}]}}]);