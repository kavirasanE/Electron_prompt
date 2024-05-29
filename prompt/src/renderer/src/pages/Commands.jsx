import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Tabs } from 'flowbite-react'
import CommandTable from '../components/commands/CommandTable'
import OutputLogs from '../components/commands/OutputLogs'

const Commands = () => {
  const data = [
    {
      GeneralCommands: [
        {
          command: 'dumpsys activity service WhadService',
          description: 'Dumpsys command for CSM/FTV devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'lipc-probe -v com.doppler.whad command',
          description: 'Dumpsys command for Puffin devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'adb shell setprop persist.amazon.whad.tsm_score 255',
          description: 'Forcing specific device to be TSS (Time Sync Server).'
        },
        {
          command: 'logcat | grep -i "updateState"',
          description:
            'To check update flow (This will show update status from Downloading to successful).'
        },
        {
          command:
            'adb shell am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService',
          description: 'To check and force app OTA download to your device.'
        },
        {
          command:
            'adb shell am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService',
          description: 'Command to start installation.'
        },
        {
          command: 'logcat -v threadtime | grep -i "DashMediaSource"',
          description: 'To check DRM wide_Entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -I DRM_GroupLicense_LicenseFetchAttempts',
          description: 'To check DRM group license/widevine_entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes',
          description:
            'To check Katana loglines from AMU music (e.g., where music is playing in 3D, R360, HD, UHD Content).'
        },
        {
          command:
            "logcat | grep -ioE 'groupkeyid=[^,]+|drm=[^&]+|DRM_GroupLicense_LoadKeys[^,]+|DRM_GroupLicense_LicenseFetchAttempts|removeAllSessions:session cached|protectionScheme=[^,]+|createSession:Creating a new session'",
          description: 'Used to check all DRM related loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i "processGaplessMuxEndOfStream"',
          description: 'To check GaplessMuxEndOfStream loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i processGaplessMuxNewTrackSameStream',
          description: 'To check Gapless Mux Start Of the Stream loglines.'
        },
        {
          command: "logcat -v threadtime | grep -i 'DemuxedFrameSourceImp'",
          description: 'To check Offset loglines command.'
        },
        {
          command: 'setprop persist.amazon.whad.ismaster 1',
          description: 'Forcing the specific Device to be ASD, only for CSM devices.'
        },
        {
          command: 'lipc-set-prop -i com.doppler.whad distributionMasterScoreOverride 500',
          description: 'Forcing the specific Device to be ASD, only for Puffin devices.'
        },
        {
          command: 'logcat | grep volume',
          description: 'To check Volume level on the devices.'
        },
        {
          command: 'logcat -v threadtime | grep -i "disContinuityFound"',
          description: 'To check discontinuity logs for Tune in station.'
        },
        {
          command: 'adb logcat -v threadtime | grep -i skew',
          description: 'To check the BT skew values.'
        },
        {
          command: 'logcat -v threadtime',
          description: 'For Running logs.'
        },
        {
          command: 'Getprop | grep build',
          description: 'To check Device build details.'
        },
        {
          command: 'logcat |grep -i "using DemuxedDataSource"',
          description: 'To check demux (Tunein HLS).'
        }
      ],
      FTVCommands: [
        {
          command: 'exampleFTVCommand',
          description: 'This is an example command for FTV operations.'
        }
      ],
      'Spotify Commands': [
        {
          command: 'exampleSpotifyCommand',
          description: 'This is an example command for Spotify operations.'
        }
      ],
      'Tuple Devices Commands': [
        {
          command: 'exampleTupleDeviceCommand',
          description: 'This is an example command for Tuple device operations.'
        }
      ],
      'Hypnos Galileo Commands': [
        {
          command: 'exampleHypnosGalileoCommand',
          description: 'This is an example command for Hypnos and Galileo operations.'
        }
      ],
      LowPowerMode: [
        {
          command: 'exampleLowPowerModeCommand',
          description: 'This is an example command for Low Power Mode operations.'
        }
      ],
      MP_SM_Commands: [
        {
          command: 'exampleMP_SM_Command',
          description: 'This is an example command for MP/SMC operations.'
        }
      ],
      Longevity: [
        {
          command: 'exampleLongevityCommand',
          description: 'This is an example command for Longevity operations.'
        }
      ]
    }
  ]

  const [section, setSection] = useState([])

  useEffect(() => {
    const commandSections = Object.keys(data[0])
    setSection(commandSections)
  }, [])

  // console.log(Object.keys(data[0]))

  const handleCommands = (e) => {
    console.log(e)
  }

  return (
    <div className="bg-white text-black w-screen h-screen">
      <Online />
      <div className="px-2">
        <Tabs
          aria-label="Tabs with underline"
          className="w-screen grid grid-cols-6"
          style="underline"
        >
          {section.map((sec, index) => (
            <Tabs.Item title={sec} key={index} />
          ))}
        </Tabs>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <div className="w-1/2">
          <CommandTable />
        </div>
        <div className="w-1/2 bg-black h-screen rounded-md">
          <OutputLogs />
        </div>
      </div>
    </div>
  )
}

export default Commands
