import {Project, File, Yml} from '@atomist/rug/model/Core'
import {ParametersSupport, Parameters} from '@atomist/rug/operations/Parameters'
import {ProjectEditor} from '@atomist/rug/operations/ProjectEditor'
import {Result,Status} from '@atomist/rug/operations/Result'
import {PathExpressionEngine, PathExpression} from '@atomist/rug/tree/PathExpression'

import {parameter, inject, parameters, tag, editor} from '@atomist/rug/support/Metadata'

import * as yaml from "js-yaml"

class LicenseParams extends ParametersSupport {
  @parameter({required: true, description: "The name of the license to add. ", displayName: "License Name", pattern: "^.*$", maxLength: 20})
  licenseName: string = null
}

//return true if file is a license file
function isLicense(f: File) {
  let path = f.path().toLowerCase()
  return path == "license" || path == "license.txt" || path == "license.md";
}

@editor("Add a license file to a project")
@tag("license")
@tag("licensing")
@tag("copyright")
class AddLicenseFile implements ProjectEditor<LicenseParams> {

  private eng: PathExpressionEngine;

  constructor(@inject("PathExpressionEngine") _eng: PathExpressionEngine ){
    this.eng = _eng;
  }

  edit(project: Project, @parameters("LicenseParams") params: LicenseParams) {

    let licenseFileName = ".atomist/templates/" + params.licenseName + ".yml"
    let licenseFile = project.backingArchiveProject().findFile(licenseFileName)
    if(licenseFile == null){
      throw Error(`Unable to find licenseFile: ${licenseFileName}`)
    }
    let strings = licenseFile.content().split("---")

    let details = yaml.safeLoad(strings[1])

    let licenseFiles: File[] = project.files().filter(isLicense)

    if(licenseFiles.length < 1){
      console.log("  Adding LICENSE file...")
      project.addFile("LICENSE",strings[2])
    }else if(licenseFiles.length == 1){
      console.log("  Updating LICENSE file...")
      licenseFiles[0].setContent(strings[2])
    }else{
      throw Error(`Found too many license files wasn't sure what to do`)
    }
    return new Result(Status.Success, "License file added")
  }
}
