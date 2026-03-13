[Setup]
AppName=System Cleaner Pro
AppVersion=3.0
AppPublisher=System Tools
DefaultDirName={pf}\System Cleaner Pro
DefaultGroupName=System Cleaner Pro
OutputDir=Output
OutputBaseFilename=SystemCleaner_Setup
Compression=lzma2
SolidCompression=yes
PrivilegesRequired=admin
SetupIconFile=icon.ico
UninstallDisplayIcon={app}\icon.ico
WizardStyle=modern

[Languages]
Name: "russian"; MessagesFile: "compiler:Languages\Russian.isl"

[Tasks]
Name: "desktopicon"; Description: "Создать ярлык на рабочем столе"; GroupDescription: "Дополнительные значки:"
Name: "quicklaunchicon"; Description: "Создать ярлык в панели быстрого запуска"; GroupDescription: "Дополнительные значки:"; Flags: unchecked

[Files]
Source: "SystemCleaner.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "README.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "icon.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "Запуск.bat"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\System Cleaner Pro"; Filename: "{app}\Запуск.bat"; IconFilename: "{app}\icon.ico"
Name: "{commondesktop}\System Cleaner Pro"; Filename: "{app}\Запуск.bat"; Tasks: desktopicon; IconFilename: "{app}\icon.ico"
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\System Cleaner Pro"; Filename: "{app}\Запуск.bat"; Tasks: quicklaunchicon; IconFilename: "{app}\icon.ico"
Name: "{group}\Удалить System Cleaner Pro"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\Запуск.bat"; Description: "Запустить System Cleaner Pro"; Flags: postinstall skipifsilent nowait

[Code]
function InitializeSetup(): Boolean;
begin
  Result := True;
end;

function ShouldSkipPage(PageID: Integer): Boolean;
begin
  Result := False;
end;