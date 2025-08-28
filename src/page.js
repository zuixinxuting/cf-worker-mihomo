export async function getFakePage(e) {
    return `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20id='Partition-Auto--Streamline-Carbon'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20height='16'%20width='16'%3E%3Cdesc%3EPartition%20Auto%20Streamline%20Icon%3A%20https%3A//streamlinehq.com%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cpath%20d='M13%209.5c-1.1028%200%20-2%200.8972%20-2%202%200%200.3418%200.0941%200.6587%200.24585%200.94045C10.30775%2013.12675%209.17285%2013.5%208%2013.5%204.9673%2013.5%202.5%2011.0327%202.5%208H1.5c0%203.584%202.9159%206.5%206.5%206.5%201.42275%200%202.79615%20-0.468%203.92165%20-1.3208C12.2334%2013.38015%2012.6023%2013.5%2013%2013.5c1.1028%200%202%20-0.8972%202%20-2s-0.8972%20-2%20-2%20-2Zm0%203c-0.5514%200%20-1%20-0.44875%20-1%20-1s0.4486%20-1%201%20-1%201%200.44875%201%201%20-0.4486%201%20-1%201Z'%20fill='%23000000'%20stroke-width='0.5'/%3E%3Cpath%20d='M8%201.5c-1.42275%200%20-2.79615%200.468%20-3.92165%201.3208C3.7666%202.61985%203.3977%202.5%203%202.5%201.8972%202.5%201%203.3972%201%204.5s0.8972%202%202%202%202%20-0.8972%202%20-2c0%20-0.3418%20-0.0941%20-0.6587%20-0.24585%20-0.94045C5.69225%202.87325%206.82715%202.5%208%202.5c3.0327%200%205.5%202.4673%205.5%205.5h1c0%20-3.584%20-2.9159%20-6.5%20-6.5%20-6.5ZM3%205.5c-0.5514%200%20-1%20-0.44875%20-1%20-1s0.4486%20-1%201%20-1%201%200.44875%201%201%20-0.4486%201%20-1%201Z'%20fill='%23000000'%20stroke-width='0.5'/%3E%3Cpath%20id='_Transparent_Rectangle_'%20d='M0%200h16v16H0Z'%20fill='none'%20stroke-width='0.5'/%3E%3C/svg%3E">
    <title>配置转换工具</title>
        <style>
        :root {
            --primary-color: #4361ee;
            --primary-light: #4895ef;
            --primary-dark: #3f37c9;
            --secondary-color: #4cc9f0;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-primary: #2b2d42;
            --text-secondary: #6c757d;
            --border-color: #e9ecef;
            --success-color: #4cc9f0;
            --error-color: #f72585;
            --warning-color: #f9c74f;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url(${e.IMG});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 20px;
            align-items: center;
            position: relative; 
        }

        .container {
            position: relative;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            max-width: 600px;
            width: 100%;
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1;
            margin-top: 40px;
        }

        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
                inset 0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 2rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .input-group {
            margin-bottom: 1.5rem;
        }

        .link-input {
            flex: 1;
            min-width: 0;
            margin-top: 0;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        .link-row {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 12px;
            gap: 12px;
        }

        .add-btn {
            flex-shrink: 0;
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
            border: none;
            font-size: 1.2rem;
        }

        .add-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        button {
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
        }

        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
        }

        button:hover::before {
            left: 100%;
        }

        button:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        #result {
            background-color: #f8f9fa;
            font-family: monospace;
            word-break: break-all;
            padding: 14px 16px !important;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            transition: all 0.3s ease;
        }

        #result:hover {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .github-corner {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000; /* 确保 GitHub 角标始终在最上层 */
        }

        .github-corner svg {
            fill: var(--primary-color);
            color: var(--card-bg);
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;
        }

        .github-corner:hover svg {
            transform: scale(1.1);
        }

        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {
            0%, 100% { transform: rotate(0); }
            20%, 60% { transform: rotate(-25deg); }
            40%, 80% { transform: rotate(10deg); }
        }

        .logo-title {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
            transition: all 0.3s ease;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
            color: var(--primary-dark);
        }

        #qrcode {
            display: none;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        #qrcode.show {
            display: flex; /* 有内容时显示 */
        }
        
        .template-selector {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .template-toggle {
            padding: 14px 16px;
            background-color: rgba(67, 97, 238, 0.08);
            font-weight: 600;
            cursor: pointer;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .template-toggle:hover {
            background-color: rgba(67, 97, 238, 0.15);
            border-color: rgba(67, 97, 238, 0.2);
        }
        
        .template-toggle:after {
            content: "▶";
            font-size: 12px;
            transition: transform 0.3s ease;
            margin-left: 8px;
        }
        
        .template-toggle.collapsed:after {
            transform: rotate(90deg);
        }
        
        .template-options {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 250px;
            overflow-y: auto;
            border: 2px solid var(--border-color);
            border-top: none;
            transition: all 0.3s ease;
        }
        
        .template-options.show {
            display: block;
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .template-option {
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid var(--border-color);
            font-size: 0.95rem;
        }
        
        .template-option:last-child {
            border-bottom: none;
        }
        
        .template-option:hover {
            background-color: rgba(67, 97, 238, 0.1);
            padding-left: 24px;
        }
        
        .template-option.selected {
            background-color: rgba(67, 97, 238, 0.15);
            font-weight: 600;
            color: var(--primary-dark);
        }

        .config-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
            background: rgba(67, 97, 238, 0.08);
            border-radius: 12px;
            padding: 6px;
            border: 2px solid transparent;
        }

        .toggle-option {
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
            flex: 1;
            position: relative;
            overflow: hidden;
            font-size: 0.95rem;
        }

        .toggle-option.active {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        .toggle-option:not(.active):hover {
            background-color: rgba(67, 97, 238, 0.15);
            transform: translateY(-1px);
        }

        .mode-options {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .mode-options.active {
            display: block;
            opacity: 1;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tip-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
        }

        .tip-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(67, 97, 238, 0.4);
        }

        .tip-wrapper {
            position: relative;
            display: inline-block;
        }

        .tip-panel {
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 28px;
            left: 0;
            min-width: 280px;
            max-width: 340px;
            max-height: 50vh;
            background: white;
            color: var(--text-primary);
            font-size: 14px;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            white-space: normal;
            line-height: 1.6;
            overflow-y: auto;
            overflow-x: hidden;
            word-break: break-word;
            transition: all 0.3s ease;
            border: 2px solid var(--border-color);
        }

        .tip-panel::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(45deg);
            border-top: 2px solid var(--border-color);
            border-left: 2px solid var(--border-color);
        }

        .tip-panel ul {
            margin: 8px 0;
            padding-left: 20px;
            list-style-type: disc;
        }

        .tip-panel li {
            margin-bottom: 6px;
        }

        .tip-panel strong, .tip-panel b {
            font-weight: bold;
            color: var(--primary-color);
            display: block;
            margin-top: 10px;
        }

        .tip-wrapper.active .tip-panel {
            opacity: 1;
            visibility: visible;
        }

        .protocol-options {
            display: flex;
            gap: 15px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .protocol-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 8px;
        }

        .protocol-checkbox:hover {
            background-color: rgba(67, 97, 238, 0.08);
        }

        .protocol-checkbox input {
            width: auto;
            margin: 0;
            cursor: pointer;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .container {
                padding: 2rem;
                margin: 10px;
                border-radius: 20px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .toggle-option {
                padding: 8px 12px;
                font-size: 0.9rem;
            }
            
            .protocol-options {
                gap: 10px;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 1.5rem;
                border-radius: 16px;
            }
            
            h1 {
                font-size: 1.6rem;
            }
            
            .link-input {
                padding: 10px 12px;
                font-size: 0.9rem;
            }
            
            .add-btn {
                width: 38px;
                height: 38px;
                font-size: 1rem;
            }
            
            button {
                padding: 12px 20px;
                font-size: 0.95rem;
            }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js"></script>
</head>

<body>
    <a href="${atob('aHR0cHM6Ly9naXRodWIuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21v')}" target="_blank" class="github-corner"
        aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg>
    </a>
    <div class="container">
        <div class="logo-title">
            <h1>配置转换工具</h1>
        </div>
        <div class="config-toggle" id="mode-toggle">
            <!-- 模式切换按钮将通过JavaScript动态生成 -->
        </div>
        
        <div id="mode-containers">
            <!-- 各模式容器将通过JavaScript动态生成 -->
        </div>

        <div class="input-group">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <label for="result">订阅地址：</label>
            </div>
            <input type="text" id="result" readonly onclick="copyToClipboard()">
            <label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
        </div>
        <div class="beian-info" style="text-align: center; font-size: 13px;">
            <a href='${e.beianurl}'>${e.beian}</a>
        </div>
    </div>

    <script>
        // 配置模式定义
        const MODES = ${e.modes};

        // 当前激活的模式
        let activeMode = 'mihomo';
        
        // 初始化应用
        document.addEventListener('DOMContentLoaded', function () {
            initModeToggle();
            initModeContainers();
            setActiveMode(activeMode);
            
            // 初始化提示系统
            initTipSystem();
            
            // 初始化模板选择器
            initAllTemplateSelectors();
        });

        // 初始化模式切换按钮
        function initModeToggle() {
            const modeToggle = document.getElementById('mode-toggle');
            
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const option = document.createElement('div');
                option.className = 'toggle-option';
                option.dataset.mode = modeId;
                option.textContent = modeConfig.name;
                
                option.addEventListener('click', function() {
                    setActiveMode(modeId);
                });
                
                modeToggle.appendChild(option);
            }
        }

        // 初始化模式容器
        function initModeContainers() {
            const modeContainers = document.getElementById('mode-containers');
            const configs = ${e.configs};
            
            for (const [modeId, modeConfig] of Object.entries(MODES)) {
                const container = document.createElement('div');
                container.id = \`\${modeId}-container\`;
                container.className = 'mode-options';
                
                // 模板选择器
                if (!modeConfig.noTemplate) {
                    const templateSelector = document.createElement('div');
                    templateSelector.className = 'template-selector';
                    templateSelector.innerHTML = \`
                        <div class="template-toggle collapsed">选择配置模板(未选择)</div>
                        <div class="template-options"></div>
                    \`;
                    container.appendChild(templateSelector);
                }
                // 输入组
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                
                const linkLabel = document.createElement('div');
                linkLabel.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 6px;';
                linkLabel.innerHTML = \`
                    <label for="link" style="margin: 0;">订阅链接</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="\${modeId}">!</span>
                        <div class="tip-panel"></div>
                    </div>
                \`;
                inputGroup.appendChild(linkLabel);
                
                const linkContainer = document.createElement('div');
                linkContainer.id = \`link-container-\${modeId}\`;
                linkContainer.innerHTML = \`
                    <div class="link-row">
                        <input type="text" class="link-input" placeholder="\${modeConfig.placeholder}" />
                        <div class="add-btn" onclick="addLinkInput(this, '\${modeId}')">➕</div>
                    </div>
                \`;
                inputGroup.appendChild(linkContainer);
                
                // 协议选项
                if (!modeConfig.noTemplate) {
                    const protocolLabel = document.createElement('label');
                    protocolLabel.textContent = '附加参数选项';
                    inputGroup.appendChild(protocolLabel);
                    
                    const protocolOptions = document.createElement('div');
                    protocolOptions.className = 'protocol-options';
                    
                    modeConfig.protocolOptions.forEach(option => {
                        const label = document.createElement('label');
                        label.className = 'protocol-checkbox';
                        label.innerHTML = \`
                            <input type="checkbox" name="protocol" value="\${option.value}" \${option.checked ? 'checked' : ''}>
                            \${option.label}
                        \`;
                        protocolOptions.appendChild(label);
                    });
                    
                    inputGroup.appendChild(protocolOptions);
                }
                container.appendChild(inputGroup);
                
                // 生成按钮
                const generateButton = document.createElement('button');
                generateButton.textContent = \`生成\${modeConfig.name}配置\`;
                generateButton.onclick = function() { generateConfig(modeId); };
                container.appendChild(generateButton);
                
                modeContainers.appendChild(container);
            }
        }

        // 设置活动模式
        function setActiveMode(modeId) {
            // 更新切换按钮状态
            document.querySelectorAll('.toggle-option').forEach(option => {
                option.classList.toggle('active', option.dataset.mode === modeId);
            });
            
            // 更新模式容器显示状态
            document.querySelectorAll('.mode-options').forEach(container => {
                container.classList.toggle('active', container.id === \`\${modeId}-container\`);
            });
            
            // 更新页面标题和顶部文字
            const modeName = MODES[modeId].name || '';
            document.title = modeName ? \`\${modeName}配置转换工具\` : '配置转换工具';
            const h1Element = document.querySelector('h1');
            if (h1Element) {
                h1Element.textContent = modeName ? \`\${modeName}配置转换工具\` : '配置转换工具';
            }
            updateResult('');
            activeMode = modeId;
        }

        // 初始化提示系统
        function initTipSystem() {
            // 弹窗提示
            document.querySelectorAll('.tip-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // 关闭所有已展开
                    document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
                    
                    const wrapper = icon.closest('.tip-wrapper');
                    wrapper.classList.toggle('active');
                    
                    const panel = wrapper.querySelector('.tip-panel');
                    const mode = icon.dataset.mode;
                    
                    // 使用 marked 渲染 Markdown 为 HTML
                    const rawMarkdown = MODES[mode].tipText || '暂无提示内容';
                    panel.innerHTML = DOMPurify.sanitize(marked.parse(rawMarkdown));
                });
            });
            
            // 点击页面其他地方关闭提示
            document.addEventListener('click', () => {
                document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
            });
        }

        // 初始化所有模板选择器
        function initAllTemplateSelectors() {
            const configs = ${e.configs};
            
            for (const modeId of Object.keys(MODES)) {
                if (!MODES[modeId].noTemplate && configs[modeId]) {
                    initTemplateSelector(modeId, configs[modeId]);
                }
            }
        }

        // 初始化模板选择器
        function initTemplateSelector(modeId, configGroups) {
            const selector = document.querySelector(\`#\${modeId}-container .template-selector\`);
            const templateToggle = selector.querySelector('.template-toggle');
            const optionsContainer = selector.querySelector('.template-options');
            
            // 生成所有模板选项
            configGroups.forEach(group => {
                // 添加分组标签
                const groupLabel = document.createElement('div');
                groupLabel.style.padding = '10px 20px';
                groupLabel.style.fontWeight = 'bold';
                groupLabel.style.color = '#555';
                groupLabel.style.backgroundColor = '#f5f5f5';
                groupLabel.textContent = group.label;
                optionsContainer.appendChild(groupLabel);
                
                // 添加选项
                group.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'template-option';
                    optionElement.textContent = option.label;
                    optionElement.dataset.value = option.value;
                    optionElement.dataset.group = group.label;
                    
                    optionElement.addEventListener('click', function () {
                        // 移除之前选中的样式
                        selector.querySelectorAll('.template-option.selected').forEach(item => {
                            item.classList.remove('selected');
                        });
                        
                        // 更新显示文本
                        templateToggle.textContent = \`\${group.label}-\${option.label}\`;
                        
                        // 添加选中样式
                        this.classList.add('selected');
                        
                        // 点击后自动折叠选项面板
                        templateToggle.classList.add('collapsed');
                        optionsContainer.classList.remove('show');
                    });
                    
                    optionsContainer.appendChild(optionElement);
                });
            });
            
            // 默认选择第一个选项
            const firstOption = selector.querySelector('.template-option');
            if (firstOption) {
                firstOption.classList.add('selected');
                const groupLabel = firstOption.dataset.group;
                const optionLabel = firstOption.textContent;
                templateToggle.textContent = \`请选择配置模板(默认-\${groupLabel})\`;
            }
            
            // 点击切换按钮展开/折叠选项
            templateToggle.addEventListener('click', function () {
                this.classList.toggle('collapsed');
                optionsContainer.classList.toggle('show');
            });
            
            // 点击页面其他区域关闭选项面板
            document.addEventListener('click', function (event) {
                if (!templateToggle.contains(event.target) && !optionsContainer.contains(event.target)) {
                    templateToggle.classList.add('collapsed');
                    optionsContainer.classList.remove('show');
                }
            });
        }

        // 添加链接输入框
        function addLinkInput(button, modeId) {
            const container = document.getElementById(\`link-container-\${modeId}\`);
            const row = document.createElement('div');
            row.className = 'link-row';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'link-input';
            input.placeholder = MODES[modeId].placeholder;
            
            button.style.display = 'none';
            row.appendChild(input);
            container.appendChild(row);
            
            const btn = document.createElement('div');
            btn.className = 'add-btn';
            btn.textContent = '➕';
            btn.onclick = function () {
                addLinkInput(btn, modeId);
            };
            
            row.appendChild(btn);
        }

        // 生成配置
        function generateConfig(modeId) {
            const inputs = document.querySelectorAll(\`#\${modeId}-container .link-input\`);
            let templateLink = '';
            
            // 只有非v2ray模式才获取选中的模板
            if (!MODES[modeId].noTemplate) {
                const selectedOption = document.querySelector(\`#\${modeId}-container .template-option.selected\`);
                templateLink = selectedOption ? selectedOption.dataset.value : '';
            }
            const protocolParams = {};
            
            document.querySelectorAll(\`#\${modeId}-container .protocol-options input[type="checkbox"]\`).forEach(checkbox => {
                protocolParams[checkbox.value] = checkbox.checked;
            });
            
            const subscriptionLinks = Array.from(inputs)
                .map(input => input.value.trim())
                .filter(val => val !== '');
            
            if (subscriptionLinks.length === 0 && templateLink) {
                alert('请输入至少一个订阅链接');
                return;
            }
            
            const allLinks = subscriptionLinks.map(link => encodeURIComponent(link));
            const origin = window.location.origin;

            const params = [];

            if (templateLink) {
                params.push(\`template=\${encodeURIComponent(templateLink)}\`);
            }
            if (allLinks.length > 0) {
                params.push(\`url=\${allLinks.join(',')}\`);
            }
            if (modeId) {
                params.push(\`\${modeId}=true\`);
            }

            for (const [protocol, enabled] of Object.entries(protocolParams)) {
                if (enabled) {
                    params.push(\`\${protocol}=true\`);
                }
            }

            const urlLink = \`\${origin}/?\${params.join('&')}\`;
            updateResult(urlLink);
        }

        // 复制到剪贴板
        function copyToClipboard() {
            const resultInput = document.getElementById('result');
            if (!resultInput.value) {
                return;
            }
            
            resultInput.select();
            navigator.clipboard.writeText(resultInput.value).then(() => {
                const tooltip = document.createElement('div');
                tooltip.style.position = 'fixed';
                tooltip.style.left = '50%';
                tooltip.style.top = '20px';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.padding = '8px 16px';
                tooltip.style.background = '#4361ee';
                tooltip.style.color = 'white';
                tooltip.style.borderRadius = '4px';
                tooltip.style.zIndex = '1000';
                tooltip.textContent = '已复制到剪贴板';
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            }).catch(err => {
                alert('复制失败，请手动复制');
            });
        }

        // 更新结果和二维码
        function updateResult(urlLink) {
            document.getElementById('result').value = urlLink;
            
            // 生成二维码
            const qrcodeDiv = document.getElementById('qrcode');
            
            if (urlLink) {
                // 有内容时显示二维码
                qrcodeDiv.classList.add('show');
                qrcodeDiv.innerHTML = '';
                new QRCode(qrcodeDiv, {
                    text: urlLink,
                    width: 220,
                    height: 220,
                    colorDark: "#4a60ea",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L,
                    scale: 1
                });
            } else {
                // 无内容时隐藏二维码
                qrcodeDiv.classList.remove('show');
                qrcodeDiv.innerHTML = '';
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('qrcode').classList.remove('show');
        });
    </script>
</body>
</html>`;
}
