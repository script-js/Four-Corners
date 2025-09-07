async function getSceneId(scenename, callback) {
    if ((gamesetup.st && gamesetup === true) || !gamesetup.st) {
        alert("Error: No auth token");
        return;
    }
    const authToken = gamesetup.st
    const url = 'https://api.smartthings.com/v1/scenes';
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };

    try {
        const response = await fetch(url, { headers });
        if (response.status === 200) {
            const scenesData = await response.json();
            const scenesDict = scenesData.items;
            var found = false;
            Object.keys(scenesDict).forEach(function (k) {
                if (scenesDict[k].sceneName.toLowerCase() == scenename.toLowerCase()) {
                    callback(scenesDict[k].sceneId)
                    found = true;
                }
            })
            if (!found) {
                alert("Scene \"" + scenename + "\" could not be found.");
            }
        } else {
            alert("Scene \"" + scenename + "\" could not be found.");
        }
    } catch (error) {
        console.error('Error fetching scenes:', error);
        alert("Error: " + error)
    }
}

async function executeScene(id) {
    var sceneUrl = "https://api.smartthings.com/v1/scenes/" + id + "/execute"
    var request = new XMLHttpRequest();
    request.open("POST", sceneUrl, true);
    request.setRequestHeader("Authorization", `Bearer ${authToken}`);
    request.send("post data");
}