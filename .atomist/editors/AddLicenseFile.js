"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Parameters_1 = require("@atomist/rug/operations/Parameters");
var Result_1 = require("@atomist/rug/operations/Result");
var PathExpression_1 = require("@atomist/rug/tree/PathExpression");
var Metadata_1 = require("@atomist/rug/support/Metadata");
var LicenseParams = (function (_super) {
    __extends(LicenseParams, _super);
    function LicenseParams() {
        var _this = _super.apply(this, arguments) || this;
        _this.licenseName = null;
        return _this;
    }
    return LicenseParams;
}(Parameters_1.ParametersSupport));
__decorate([
    Metadata_1.parameter({ required: true, description: "The name of the license to add. ", displayName: "License Name", pattern: "@url", maxLength: 20 }),
    __metadata("design:type", String)
], LicenseParams.prototype, "licenseName", void 0);
function isLicense(f) {
    var path = f.path().toLowerCase();
    return path == "license" || path == "license.txt" || path == "license.md";
}
var AddLicenseFile = (function () {
    function AddLicenseFile(_eng) {
        this.eng = _eng;
    }
    AddLicenseFile.prototype.edit = function (project, params) {
        var licenseFiles = project.files().filter(isLicense);
        if (licenseFiles.length < 1) {
            var filename = params.licenseName + ".yml";
            var editorProject = project.backingArchiveProject();
            editorProject.files().forEach(function (t) { return console.log(t.path()); });
            var pe = new PathExpression_1.PathExpression(".//*[name='" + filename + "']->yml");
            var licenseYml = this.eng.scalar(editorProject, pe);
            return new Result_1.Result(Result_1.Status.Success, "License file added");
        }
    };
    return AddLicenseFile;
}());
__decorate([
    __param(1, Metadata_1.parameters("LicenseParams")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LicenseParams]),
    __metadata("design:returntype", void 0)
], AddLicenseFile.prototype, "edit", null);
AddLicenseFile = __decorate([
    Metadata_1.editor("Add a license file to a project"),
    Metadata_1.tag("license"),
    Metadata_1.tag("licensing"),
    Metadata_1.tag("copyright"),
    __param(0, Metadata_1.inject("PathExpressionEngine")),
    __metadata("design:paramtypes", [Object])
], AddLicenseFile);
