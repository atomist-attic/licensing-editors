# Atomist 'licensing-editors'

[![Build Status](https://travis-ci.org/atomist-rugs/licensing-editors.svg?branch=master)](https://travis-ci.org/atomist-rugs/licensing-editors)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

This [Rug](http://docs.atomist.com/) archive has editors that manage
license files and copyright notices in software projects.  License
files come from http://choosealicense.com/ .

Supported operations:
-  \<licenseName - name of a file from .atomist/templates without the .yml\>

e.g. `rug edit -C /tmp AddLicenseFile licenseName="agpl-3.0"`

## Rugs

### AddLicenseFile

The AddLicenseFile editor adds a license file to a project.  If a
license file already exists in the project, it replaces it.  If more
than one license file exists in the project, it refuses to do
anything.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A project with zero or one license file

#### Parameters

To run this editor, you must supply the following parameters.

*   `license_name`: The name of the license to add to the project.
    Available licenses can be found in the Atomist [templates][]
    directory.  The value provided for the `license_name` parameter
    should be the name of one of the files in that directory, without
    the `.yml` extension.

[templates]: https://github.com/atomist-rugs/licensing-editors/tree/master/.atomist/templates

#### Running

Run it as follows:

```
$ cd to/your/project
$ rug edit atomist-rugs:licensing-editors:AddLicenseFile \
    license_name=mit
```

This will add the MIT license to the project.  If no license file is
found in the project, the license will be put in a file named
`LICENSE` at the root of the project.  If a file named `LICENSE`,
`LICENSE.txt`, or `LICENSE.md` is found in the project (the search is
case insensitive), the contents of that file will be replaced with the
provided license.  If you like the changes, commit them.

## Support

General support questions should be discussed in the `#support`
channel on our community slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-rugs/licensing-editors/issues

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli].  Before running the Rug CLI and after any changes
to the `.atomist/package.json` file, you should ensure all of the
dependencies are available locally by running `npm install`.

[cli]: https://github.com/atomist/rug-cli

```sh
$ cd .atomist
$ npm install
$ rug test
$ rug install
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

```sh
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---
Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
