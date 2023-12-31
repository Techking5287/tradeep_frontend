import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, TextField, Tooltip, makeStyles, Modal } from '@material-ui/core';
import Drawflow from 'drawflow';
// import { chart } from './chart.js';
import { result } from 'lodash';

const DrawflowWrapper = () => {
  const drawflowRef = useRef(null);
  var container = "";
  var editor = "";
  const lock = useRef(null);
  const unlock = useRef(null);
  var dataToImport = "";
  var lastDataToImport = [];
  var undoCount = 0;
  var redoCount = 0;

  useEffect(() => {
    container = document.getElementById('drawflow');
    editor = new Drawflow(container);

    editor.reroute = true;
    dataToImport = {
      "drawflow": {
          "Home": {
              "data": {
                  "1": {
                      "id": 1,
                      "name": "welcome",
                      "data": {},
                      "class": "welcome",
                      "html": "\n    <div>\n      <div class=\"title-box\" style=\"line-height: 25px;\"><p>👏 <b>Welcome!!</b></p>\n        <p><b>ChatGPT Engine!!</b>🤖</p></div>\n      <div class=\"box\">\n        <p><b>Tradeep.ai</b> is model training platform.</p>\n        <p>Build Agents, Train them on financial asset.</p>\n\n        <p>Enrich their features<br>\n           Work with Chatgpt<br>\n           to empower your trading.<br>\n           <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n <div id='chart-container'></div>      </div>\n     <div class=\"p-10\"><textarea rows=\"1\" class=\"w-full p-10 m-auto welcome-textarea\" placeholder=\"To ChatGPT...\"></textarea><button class=\"py-5 px-10 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700\">BsSendFill</button><button style=\"float: right;\" class=\"py-5 px-10 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700\">BiCopy</button></div>    </div>\n    ",
                      "typenode": false,
                      "inputs": {},
                      "outputs": {},
                      "pos_x": 500,
                      "pos_y": 50
                  },
              }
          },
      }
  }
    editor.start();
    editor.import(dataToImport);

    const handleModuleChanged = (name) => {
      console.log(`Module Changed ${name}`);
    }
    // Events!
    editor.on('moduleChanged', handleModuleChanged);
    editor.on('nodeMoved', function () {
      lastDataToImport.push(editor.export());
      undoCount = lastDataToImport.length - 1;
    })

    editor.on('connectionCreated', function () {
      lastDataToImport.push(editor.export());
      undoCount = lastDataToImport.length - 1;
    })

    editor.on('nodeRemoved', function() {
      console.log(editor.export());
      lastDataToImport.push(editor.export());
      undoCount = lastDataToImport.length - 1;
    })

    // return () => {
    //   editor.off('moduleChaged', handleModuleChanged);
    // }
  }, []);


  /* DRAG EVENT */

  /* Mouse and Touch Actions */

  var elements = document.getElementsByClassName('drag-drawflow');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('touchend', drop, false);
    elements[i].addEventListener('touchmove', positionMobile, false);
    elements[i].addEventListener('touchstart', drag, false );
  }

  var mobile_item_selec = '';
  var mobile_last_move = null;
  function positionMobile(ev) {
    mobile_last_move = ev;
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    if (ev.type === "touchstart") {
      mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
  }
  
  function drop(ev) {
    lastDataToImport.push(editor.export());
    undoCount = lastDataToImport.length - 1;
    if (ev.type === "touchend") {
      var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
      if(parentdrawflow != null) {
        addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
      }
      mobile_item_selec = '';
    } else {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("node");
      addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }
  }

  function addNodeToDrawFlow(name, pos_x, pos_y) {
    if(editor.editor_mode === 'fixed') {
      return false;
    }
    pos_x = pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
    pos_y = pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));

    switch (name) {
      case 'environment':
      var environment = `
        <div>
          <div class="title-box"><i class="fa-solid fa-seedling"></i> Env(APPL)<i class="fa fa-cog"></i></div>
          <div class="box">
            <select>
              <option value="crypto">Crypto</option>
              <option value="stock_ETF">Stocks & ETF</option>
              <option value="indices">Indices</option>
              <option value="forex">Forex</option>
              <option value="commodities">Commodities</option>
            </select>
          </div>
          <div class="box">
            <label>Timeframe:</label>
            <select>
              <option value="1m">1M</option>
              <option value="5m">5M</option>
              <option value="30m">30M</option>
              <option value="1h">1H</option>
              <option value="4h">4H</option>
              <option value="8h">8H</option>
              <option value="12h">12H</option>
              <option value="1d">1D</option>
              <option value="1w">1W</option>
            </select>
          </div>
        </div>
      `;
        editor.addNode('environment', 1,  1, pos_x, pos_y, 'environment', {}, environment );
        break;
      case 'state':
        var state = `
          <div>
            <div class="title-box"><i class="fas fa-business-time"></i> State<i class="fa fa-cog"></i></div>
            <div class="box">
              <select>
                <option value="forexbrocker_a">ForexBroker A</option>
                <option value="1m">1M</option>
                <option value="5m">5M</option>
                <option value="15m">15M</option>
                <option value="30m">30M</option>
                <option value="1h">1H</option>
                <option value="4h">4H</option>
                <option value="1d">1D</option>
              </select>
            </div>
            <div class="box" unresizable="true">
              <span class="w-full">Window Size:</span>
              <div class="w-full">
                <input id="minmax-range" type="range" min="0" max="2000" value="1000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              </div>
            </div>
          </div>
        `
        editor.addNode('state', 1, 1, pos_x, pos_y, 'state', {}, state );
        break;
      case 'reward':
        var reward = `
          <div>
            <div class="title-box"><i class="fas fa-medal"></i> Reward<i class="fa fa-cog"></i></div>
            <div class="box">
              <select>
                <option value="sharp_reward_a">Sharp Reward A</option>
                <option value="profit_reward_b">ProfitReward B</option>
                <option value="mini_drawdown">MiniDrawdown</option>
              </select>
            </div>
          </div>
        `;
        editor.addNode('reward', 1, 1, pos_x, pos_y, 'reward', {}, reward );
        break;
      case 'broker_account':
        var broker_account = `
        <div>
          <div class="title-box"><i class="fa-regular fa-user"></i> Broker Account<i class="fa fa-cog"></i></div>
          <div class="box">
            <select>
              <option value="metatrader4">Metatrader4</option>
              <option value="metatrader5">Metatrader5</option>
              <option value="binance">Binance</option>
              <option value="ohanda">Ohanda</option>
            </select>

          </div>
        </div>
        `;
        editor.addNode('broker_account', 1, 1, pos_x, pos_y, 'broker_account', {}, broker_account );
        break;
      case 'models':
        var models = `
          <div>
            <div class="title-box"><i class="fa fa-tasks"></i> 3rd Party Data<i class="fa fa-cog"></i></div>
            <div class="box">
              <select>
                <option value="rl">RL</option>
                <option value="ml">ML</option>
                <option value="supervised">SuperVised</option>
              </select>
            </div>
          </div>
        `;
        editor.addNode('models', 1, 1, pos_x, pos_y, 'models', {}, models );
        break;
      case 'agents':
          var agents = `
            <div>
              <div class="title-box"><i class="fa fa-building"></i> Agents<i class="fa fa-cog"></i></div>
              <div class="box">
                <select>
                  <option value="ppo">PPO</option>
                  <option value="sac">SAC</option>
                  <option value="ddpg">DDPG</option>
                  <option value="multiAgent_ddpg">Multi-Agent DDPG</option>
                  <option value="a2c">A2C</option>
                  <option value="td3">TD3</option>
                </select>
              </div>
            </div>
          `;
          editor.addNode('agents', 1, 1, pos_x, pos_y, 'agents', {}, agents );
          break;
      case 'event_logger':
        var event_logger = `
        <div>
          <div class="title-box"><i class="fas fa-file-alt"></i> Event Logger <i class="fa fa-cog"></i></div>
        </div>
        `;
        editor.addNode('event_logger', 1, 1, pos_x, pos_y, 'event_logger', {}, event_logger );
        break;
      case 'action_space':
        var action_space = `
          <div>
            <div class="title-box"><i class="fab fa-buysellads"></i> ActionSpace<i class="fa fa-cog"></i></div>
            <div class="box">
              <select>
                <option value="buy_sell_move2break">Buy,Sell-Move2Break</option>
                <option value="buy_sell_hold">Buy, Sell, Hold</option>
              </select>
            </div>
          </div>
        `;
        editor.addNode('action_space', 1, 1, pos_x, pos_y, 'action_space', {}, action_space );
        break;
      case 'features':
        var features = `
          <div>
            <div class="title-box">
              <i class="fas fa-rocket"></i> Features
              <i class="fa fa-cog"></i>
            </div>
            <div class="box">
              <select>
                <option value="ma9">MA9</option>
                <option value="ma21">MA21</option>
                <option value="vwap">VWAP</option>
                <option value="bbands">BBands</option>
                <option value="heniken_hashi">Heniken Hashi</option>
                <option value="renko">Renko</option>
                <option value="td3">TD3</option>
              </select>
            </div>
          </div>
        `;
        editor.addNode('features', 1, 1, pos_x, pos_y, 'features', {}, features );
        break;
      case 'social_channels':
        var social_channels = `
          <div>
            <div class="title-box" style="font-size: 15px">
              <i class="fa-brands fa-telegram"></i> Social Channels
              <i class="fa fa-cog"></i>
            </div>
            <div class="box">
              <select>
                <option value="email">email</option>
                <option value="telegram">telegram</option>
                <option value="discord">discord</option>
                <option value="whatsapp">whatsapp</option>
              </select>
            </div>
          </div>
        `;
        editor.addNode('social_channels', 1, 0, pos_x, pos_y, 'social_channels', {}, social_channels );
        break;
      default:
        var other = `
        <div>
          <div class="title-box">
            <i class="fa-solid fa-code"></i> ${name}
            <i class="fa fa-cog"></i>
          </div>
          <div class="env-setting w-full pr-10 pl-10 pb-10">
            <button onclick="statePrompt()" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10 mt-10 rounded">Setup</button>
          </div>
        </div>
        `
        editor.addNode(name, 1, 1, pos_x, pos_y, name, {}, other );
        break;
    }
  }

  function undo() {
    redoCount = undoCount;
    if (undoCount >= 0 && lastDataToImport.length > 0) {
      editor.clear();
      editor.import(lastDataToImport[undoCount]);
      undoCount--;
    }
    if (undoCount < 0) {
      undoCount = 0;
    }
  }

  function redo() {
    undoCount = redoCount-1;
    if (redoCount < lastDataToImport.length - 1) {
      redoCount++;
      editor.import(lastDataToImport[redoCount]);
    }
  }

  function changeModule(event) {
    lastDataToImport = [];
    undoCount = 0;
    var all = document.querySelectorAll(".menu ul li");
    for (var i = 0; i < all.length; i++) {
      all[i].classList.remove('selected');
    }
    event.target.classList.add('selected');
    editor.changeModule(event.target.getAttribute('module-name'));
  }

  function changeMode(option) {
  //console.log(lock.id);
    if(option == 'lock') {
      editor.editor_mode='fixed';
      lock.current.style.display = 'none';
      unlock.current.style.display = 'block';
    } else {
      editor.editor_mode='edit';
      lock.current.style.display = 'block';
      unlock.current.style.display = 'none';
    }
  }

  const handleClearModule = () => {
    editor.clearModuleSelected();
  }

  const handleExport = () => {
    Swal.fire({ title: 'Export',
      html: '<pre><code>'+JSON.stringify(editor.export(), null,4)+'</code></pre>'
    })
  }

  const handleZoomOut = () => {
    editor.zoom_out();
  }

  const handleZoomIn = () => {
    editor.zoom_in();
  }

  const handleZoomReset = () => {
    editor.zoom_reset();
  }

  const tabRemove = (event) => {
    Swal.fire({
      title: "Are you sure?",
      icon: 'success',
      confirmButtonText: 'Sure'
    })
    .then((result) => {
      if (result.isConfirmed) {
        var tabName = event.target.getAttribute('module-name');
        var tab = document.getElementById(tabName);
        tab.parentNode.removeChild(tab);
        // dataToImport.deletedModule = dataToImport.drawflow[tabName];
        // delete dataToImport.drawflow[tabName];
        // console.log(dataToImport.drawflow);
      }
    })
  }

  const addModule = () => {
    Swal.fire({
      title: "Create New Agent/Model",
      html: '<input placeholder="Input tag name..." id="add_new_tab" margin="normal" />'
    })
    .then((result) => {
      if (result.isConfirmed) {
        var tabName = document.getElementById("add_new_tab").value;
        if (tabName) {
          if (dataToImport.drawflow[tabName]) {
            Swal.fire({
              title: "A tab with the same name already exists.",
              icon: 'warning'
            })
          } else {
            var tabData = {data: {}};
            lastDataToImport.push(editor.export());
            lastDataToImport[lastDataToImport.length-1].drawflow[tabName] = tabData;
            const newHTMLNode = document.createElement("li");
            newHTMLNode.addEventListener('click', changeModule);
            newHTMLNode.setAttribute("module-name", tabName);
            newHTMLNode.setAttribute("id", tabName);
            newHTMLNode.innerHTML = tabName + ' <button class="tab-remove"><img class="tab-remove-icon" src="./assets/images/remove-icon.png" /></button>';
            const tabs = document.getElementById("tab_buttons");
            const plusButton = tabs.lastChild;
            tabs.insertBefore(newHTMLNode, plusButton);  
            dataToImport.drawflow
            console.log(dataToImport.drawflow);

            editor.clear();
            editor.import(lastDataToImport[lastDataToImport.length-1]);
            const remove = document.getElementsByClassName("tab-remove");
            const removeIcons = document.getElementsByClassName("tab-remove-icon");
            remove[remove.length - 1].addEventListener("click", tabRemove);            
            remove[remove.length - 1].setAttribute("module-name", tabName);
            removeIcons[remove.length - 1].setAttribute("module-name", tabName);
          }
        } else {
          Swal.fire({
            title: "Input the tag name",
            icon: 'warning'
          })
        }
      }
    })
  }

  const addElement = () => {
    Swal.fire({
      title: "Create New Module/Strategy",
      html: '<input placeholder="Input here..." id="add_new_module" margin="normal" />'
    })
    .then((result) => {
      if (result.isConfirmed) {
        var moduleName = document.getElementById('add_new_module').value;
        if (moduleName) {
          const newHTMLNode = document.createElement("div");
          newHTMLNode.setAttribute("data-node", moduleName);
          newHTMLNode.setAttribute("class", 'drag-drawflow');
          newHTMLNode.setAttribute("draggable", 'true');
          newHTMLNode.addEventListener("dragstart", drag);
          newHTMLNode.innerHTML = `<i class="fa fa-tasks"></i><span> ${moduleName}</span>`;
          const modules = document.getElementById('left_sidebar');
          const addButton = modules.lastChild;
          modules.insertBefore(newHTMLNode, addButton);
        } else {
          Swal.fire({
            title: "Input the module name",
            icon: 'warning'
          })
        }
      }
    })
  }

  const startTootipStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: 'white',
      color: '#556EE6',
      fontSize: '25px',
    },
  }));

  const startClasses = startTootipStyles();

  const modalStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '30%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }));

  const modalClasses = modalStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
      // <div ref={drawflowRef} style={{ height: '500px', width: '70%',background:"red" }} />
      <Box>
        <Box className="wrapper">
          <Box className="col" id='left_sidebar'>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="environment">
              <i className="fa-solid fa-seedling"></i><span> Env(APPL)</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="agents">
              <i className="fa fa-building"></i><span> Agents</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="state">
              <i className="fas fa-business-time"></i><span> State </span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="reward">
              <i className="fas fa-medal"></i><span> Reward</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="action_space">
              <i className="fab fa-buysellads"></i><span> ActionSpace</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="features">
              <i className="fas fa-rocket"></i><span> Features</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="social_channels">
              <i className="fa-brands fa-telegram"></i><span> Social Channels</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="event_logger">
              <i className="fas fa-file-alt"></i><span> Event logger</span>
            </Box>
            <Box className="drag-drawflow" draggable="true" onDragStart={drag} data-node="models">
              <i className="fa fa-tasks"></i><span> 3rd Party Data</span>
            </Box>
            <Box className="add-new-element" onClick={addElement}>
              <i className="fa fa-plus"></i><span> Add New</span>
            </Box>
          </Box>
          <Box className="col-right" style={{background:"black"}}>
            <Box className="menu" style={{color: "black"}}>
              <ul id='tab_buttons'>
                <li onClick={changeModule} module-name="Home" className="selected">Home</li>
                <li onClick={addModule}><i className='fa fa-plus'></i></li>
              </ul>
            </Box>
            <Box id="drawflow" onDrop={drop} onDragOver={allowDrop}>
              <div id="chart-container"></div>
              <Tooltip classes={{ tooltip: startClasses.customTooltip }} placement="right" title="Start Trading">
                <Box className='bar-play' onClick={handleOpen}>
                  <button><i className='btn-controls-play fas fa-play'></i></button>
                </Box>
              </Tooltip>
              <Box className='bar-controls'>
                <Tooltip title="Undo">
                  <Button style={{minWidth: '50px'}} onClick={undo}><i className='fas fa-undo'></i></Button>
                </Tooltip>
                <Tooltip title="Redo">
                  <Button style={{minWidth: '50px'}} onClick={redo}><i className='fas fa-redo'></i></Button>
                </Tooltip>
                <Tooltip title="Notes">
                  <Button style={{minWidth: '50px'}}><i className='fas fa-file-alt'></i></Button>
                </Tooltip>
                <Tooltip title="Auto Aligne">
                  <Button style={{minWidth: '50px'}}><i className='fas fa-plane'></i></Button>
                </Tooltip>
                <Tooltip title="Save">
                  <Button style={{minWidth: '50px'}}><i className='fas fa-save'></i></Button>
                </Tooltip>
                <Tooltip title="Share">
                  <Button style={{minWidth: '50px'}}><i className='fas fa-share-alt'></i></Button>
                </Tooltip>
                <Tooltip title="Export">
                  <Button style={{minWidth: '50px'}} onClick={handleExport}><i className='fas fa-file-export'></i></Button>
                </Tooltip>
              </Box>
              <Box className="btn-lock" style={{height: '35px'}}>
                <Tooltip title="Lock">
                  <Button style={{minWidth: '50px', lineHeight: '0px'}} ref={lock} onClick={() => changeMode('lock')}><i className="fas fa-lock"></i></Button>
                </Tooltip>
                <Tooltip title="Unlock">
                  <Button ref={unlock} onClick={() => changeMode('unlock')} style={{display:'none', minWidth: "50px", lineHeight: '0px'}}><i className="fas fa-lock-open"></i></Button>
                </Tooltip>
              </Box>
              <Box className="bar-zoom">
                <Tooltip title="Zoom Out">
                  <Button style={{minWidth: '50px'}} className='btn-zoom' onClick={handleZoomOut}><i className="fas fa-search-minus"></i></Button>
                </Tooltip>
                <Tooltip title="Reset">
                  <Button style={{minWidth: '50px'}} className='btn-zoom' onClick={handleZoomReset}><i className="fas fa-search"></i></Button>
                </Tooltip>
                <Tooltip title="Zoom In">
                  <Button style={{minWidth: '50px'}} className='btn-zoom-last' onClick={handleZoomIn}><i className="fas fa-search-plus"></i></Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <div className={modalClasses.paper}>
            <h2>Trading Config</h2>
            <Box
              sx={{
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Device" id="trainingDevice" />
              <TextField fullWidth label="Steps" id="trainingSteps" />
              <TextField fullWidth label="Historical Data" id="historicalData" />
              <TextField fullWidth label="Window Size" id="windowSize" />
            </Box>
            <Box className='start-btns-box'>
              <Button className='start-config-btn' variant="contained" color="primary" onClick={handleClose}>
                <img style={{width: '23px'}} src="./assets/images/sololearn.png" />
                 Start trading
              </Button>
              <Button className='start-config-btn' variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </div>
        </Modal>

      </Box>
    );
};

export default DrawflowWrapper;
