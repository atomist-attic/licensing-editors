import {Project, File, Yml} from '@atomist/rug/model/Core'
import {ParametersSupport, Parameters} from '@atomist/rug/operations/Parameters'
import {ProjectEditor} from '@atomist/rug/operations/ProjectEditor'
import {Result,Status} from '@atomist/rug/operations/Result'
import {PathExpressionEngine, PathExpression} from '@atomist/rug/tree/PathExpression'

import {parameter, inject, parameters, tag, editor} from '@atomist/rug/support/Metadata'

import * as yaml from '@types/js-yaml'

class LicenseParams extends ParametersSupport {
  @parameter({required: true, description: "The name of the license to add. ", displayName: "License Name", pattern: "@url", maxLength: 20})
  licenseName: string = null

}
//return true iff file is a license file
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

    let licenseFiles: File[] = project.files().filter(isLicense)

    if(licenseFiles.length < 1){
      let yamls = yaml.loadAll(project.backingArchiveProject().findFile(params.licenseName + ".yml").content(), (t => console.log(t)))
      console.log(yamls)
    //  let yamls = jsyaml.loadAll()
        //let filename = params.licenseName + ".yml"
      //  let licenseYaml = jsyaml
        // let editorProject = project.backingArchiveProject()
        // editorProject.files().forEach(t => console.log(t.path()))
        // let pe = new PathExpression<Project,Yml>(".//*[name='" + filename +"']->yml")
        //
        // let licenseYml: Yml = this.eng.scalar(editorProject, pe)

        //project.copyEditorBackingFileOrFail(filename, "LICENSE")
        return new Result(Status.Success, "License file added")
    }
  }
}
