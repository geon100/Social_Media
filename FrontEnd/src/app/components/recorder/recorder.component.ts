import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent {
  recording = false;

  audioBlob: Blob | null = null;
  audioUrl: string | null = null;
  mediaStream:MediaStream | undefined
  private recorder: any;

  constructor(private cdr: ChangeDetectorRef,private dialogRef: MatDialogRef<RecorderComponent>) {}

  toggleRecording(): void {
    if (this.recording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
    this.recording = !this.recording;
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      (stream) => {

        this.recorder = new RecordRTC(stream, { type: 'audio' });
        this.recorder.startRecording();
        this.mediaStream=stream
        
      },
      (error) => {
        console.error('Error accessing microphone:', error);
        // Handle error (e.g., show a user-friendly message)
      }
    );
  }

  stopRecording(): void {
    if (this.recorder) {
      this.recorder.stopRecording(
        () => {
          this.audioBlob = this.recorder.getBlob();
          this.audioUrl = this.recorder.toURL();
          
          if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track:any) => track.stop());
          }
          this.cdr.detectChanges(); 
        },
        (error: any) => {
          console.error('Error stopping recording:', error);
          // Handle error (e.g., show a user-friendly message)
        }
      );
    }
  }

  resetRecording(): void {
    this.audioBlob = null;
    this.audioUrl = null;
    this.mediaStream=undefined
    this.recording=false
    if (this.recorder) {
      this.recorder.reset();
      this.cdr.detectChanges()
    }
  }

  sendRecording(){
    if(this.audioBlob){
      this.dialogRef.close(this.audioBlob)
    }
  }
  
}
