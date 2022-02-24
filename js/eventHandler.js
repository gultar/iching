    
function cast(){

    $('#title').html("")
    $('#text').html("")
    $('#changingTitle').html("")
    $('#changingText').html("")
    $('#lines').html("");
    $('#changingLines').html("");
    $('sectionSeperator').html("")

    var myHex = new Hexagram();
    myHex.castSixLines();
    myHex.hexagramNumber = myHex.getHexagramNumber();
    myHex.getChangingHex()
    myHex.changingHexagramNumber = myHex.getHexagramNumber(myHex.changingTrigrams);
    $('#title').html(iching.posts[myHex.hexagramNumber -1].title)
    $('#text').html(iching.posts[myHex.hexagramNumber -1].text)
    $('#changingTitle').html(iching.posts[myHex.changingHexagramNumber -1].title)
    $('#changingText').html(iching.posts[myHex.changingHexagramNumber -1].text)
    for(var i=myHex.sixlines.length; i>=0; i--){
        $('#lines').append("<p>"+myHex.drawLine(myHex.sixlines[i])+"</p>");
        $('#changingLines').append("<p>"+myHex.drawLine(myHex.changingLines[i])+"</p>");
        $('sectionSeperator').html("<hr><br><br>Changing Hexagram")
    
    }

    console.log(myHex)
    
    updateReadingsStorage(myHex)
    
}

function selectHexagram(){
    $('#title').html("")
    $('#text').html("")
    $('#changingTitle').html("")
    $('#changingText').html("")
    $('#lines').html("");
    $('#changingLines').html("");
    $('sectionSeperator').html("")
    var number = $("#hexNumberTextbox").val()
    number = parseInt(number)
    var myHex = new Hexagram();
    var ichingHexagramTable = [ //--- Hexagram lookup table - King Wen's trigram order is used
    [1, 34, 5, 26, 11, 9, 14, 43],
    [25, 51, 3, 27, 24, 42, 21, 17],
    [6, 40, 29, 4, 7, 59, 64, 47],
    [33, 62, 39, 52, 15, 53, 56, 31],
    [12, 16, 8, 23, 2, 20, 35, 45],
    [44, 32, 48, 18, 46, 57, 50, 28],
    [13, 55, 63, 22, 36, 37, 30, 49],
    [10, 54, 60, 41, 19, 61, 38, 58]
    ];
    var trigramNbs = [ //--- All the possible trigrams
    "111",
    "100",
    "010",
    "001",
    "000",
    "011",
    "101",
    "110"
    ];
    var bottomTrigramNumber = 0;
    var topTrigramNumber = 0;

    for(var line of ichingHexagramTable){
        var bottomIndex = ichingHexagramTable.indexOf(line)
        for(var column of line){
        var topIndex = line.indexOf(column)
                if(number == column){
                    bottomTrigramNumber = bottomIndex
                    topTrigramNumber = topIndex
                }
        }
    }


    let binaryString = trigramNbs[bottomTrigramNumber] + trigramNbs[topTrigramNumber]
    let binaryLines = [...binaryString]
    let sixlines = []
    binaryLines.reverse()
    for(var i=0; i < binaryLines.length; i++){
        var char = binaryLines[i]
        sixlines[i] = 8 - parseInt(char)
        $('#lines').append("<p>"+myHex.drawLine(sixlines[i])+"</p>");

    }
    
    $('#title').html(iching.posts[number -1].title)
    $('#text').html(iching.posts[number -1].text)
    myHex.trigrams = [bottomTrigramNumber, topTrigramNumber]
    myHex.hexagramNumber = number;
    myHex.sixlines = sixlines
    console.log(myHex)

}

const updateReadingsStorage = (myHex) =>{
    let readings = retrieveReadingsStorage()

    let today = Date.now();
    let entry = {
        hexagramNumber:myHex.hexagramNumber,
        changingLines:myHex.changingLines,
        changingHexagramNumber:myHex.changingHexagramNumber
    }
    if(readings == null){
        readings = {
            [today]:entry
        }
    }else{
        
        readings[today] = entry;
    }
    
    //store hexagram reading by date
    saveReadings(readings)

}
const saveReadings = (readingsObject) =>{
    localStorage.setItem('readings', JSON.stringify(readings))
}

const retrieveReadingsStorage = () =>{
    if(!localStorage.getItem('readings') == null){
        return JSON.parse(localStorage.getItem('readings'))
    }else {
        return {}
    }
}

const deleteReadingsStorage = () =>{
    localStorage.setItem('readings', null)
}

const convertTimestamp = () =>{}

const getReading = (timestamp) =>{
    let readings = retrieveReadingsStorage()
    return readings[timestamp]
}
    
