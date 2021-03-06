/**
 * This file is a placeholder for a valid yFiles for HTML license.
 *
 * Either add your license to this file or replace it with another file that contains your license.
 *
 * The section 'Deployment - Licensing' in the yFiles for HTML developer's guide has more information about this topic:
 *
 *  http://docs.yworks.com/yfileshtml/#/dguide/licensing
 *
 */
if (typeof console === 'undefined') {
  console = {log: function(){}};
}
function parseLicense(licenseString) {
  try {
    return JSON.parse(licenseString);
  } catch (e) {
    // try a container object
    try {
      return JSON.parse('{' + licenseString + '}');
    } catch (e) {
      console.log('Could not parse license information from local storage.');
    }
  }
  return null;
}
function useLicenseFromLocalStorage() {
  if (isLocalStorageSupported() && window.localStorage.getItem('yFiles_for_HTML_license')) {
    var licenseObject = parseLicense(window.localStorage.getItem('yFiles_for_HTML_license'));
    if (licenseObject !== null && typeof licenseObject === 'object') {
      if ('function' == typeof define && define.amd) {
        define(['yfiles/lang'], function (lang) {
          lang.yfiles.license = licenseObject;
        });
      } else {
        if (!window.yfiles) {
          window.yfiles = {};
        }
        window.yfiles.license = licenseObject;
      }
      return true;
    }
  }
  return false;
}
function isLocalStorageSupported() {
  if (!window.localStorage) return false;
  try {
    window.localStorage.setItem('probe', true);
    window.localStorage.removeItem('probe');
    return true;
  } catch (error) {
    return false;
  }
}
if (typeof window !== 'undefined') {
  if (useLicenseFromLocalStorage()) {
    console.log('Using license from local storage.');
  } else {
    window.setTimeout(function () {
      var div = document.createElement('div');
      div.setAttribute('style',
        'position:absolute; visibility:visible; top:280px; left:0; right:0; margin:auto; width:50em; padding:10px; z-index:1001; '
        + 'background:#efefef; border: 2px solid #888; color:black;');
      div.innerHTML = '<h2>No yFiles for HTML license included</h2>\
    <p>Enter your license information in JavaScript format into the file <b>demos/resources/license.js</b>.</p>\
    <p>If you have received a license file from yWorks, you can simply overwrite the file <b>demos/resources/license.js</b> with\
    the license file you have received.</p>\
    <p>If you have received license information in another way, please replace the contents of the file <b>demos/resources/license.js</b> \
    with the actual license information.</p>';
      if (isLocalStorageSupported()) {
        div.innerHTML += '<p>You can also temporarily enter your license information below which is then stored in the local storage of your browser.</p>';
        var licenseInputDiv = document.createElement('div');
        var input = document.createElement('textarea');
        input.setAttribute('rows', '6');
        input.setAttribute('style', 'width: 100%; resize: vertical');
        input.setAttribute('placeholder', '"company": ...');
        var inputNote = document.createElement('span');
        inputNote.setAttribute('style', 'display: none;');
        inputNote.innerHTML = 'Please enter your license information.';
        var confirm = document.createElement('button');
        confirm.innerHTML = "Save and reload";
        confirm.addEventListener('click', function () {
          if (input.value.length > 0) {
            window.localStorage.setItem("yFiles_for_HTML_license", input.value);
            window.location.reload();
          } else {
            inputNote.setAttribute('style', 'display: inline; margin-left: 5px; color: red;');
          }
        });
        licenseInputDiv.appendChild(input);
        licenseInputDiv.appendChild(confirm);
        licenseInputDiv.appendChild(inputNote);
        div.appendChild(licenseInputDiv);
      }
      document.body.appendChild(div);
    }, 2000);
  }
} else {
  console.log('No yFiles for HTML license included!')
}
