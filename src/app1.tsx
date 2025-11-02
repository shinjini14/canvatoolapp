import React, { useState, useEffect } from 'react';
import { Button, Rows, Checkbox, MultilineInput, Select, TextInput, FormField } from "@canva/app-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from 'styles/components.css';
import { upload } from "@canva/asset";
import { addNativeElement } from "@canva/design";

export const App = () => {
  const [activeTab, setActiveTab] = useState('Pattern Notes');
  const [patternName, setPatternName] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [skillLevel, setSkillLevel] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [hook, setHook] = useState('');
  const [editingHookIndex, setEditingHookIndex] = useState<number | null>(null);
  const [otherTools, setOtherTools] = useState<string[]>([]);
  const [otherTool, setOtherTool] = useState('');
  const [editingToolIndex, setEditingToolIndex] = useState<number | null>(null);
  const [yarnTypes, setYarnTypes] = useState<string[]>([]);
  const [yarnType, setYarnType] = useState('');
  const [editingYarnIndex, setEditingYarnIndex] = useState<number | null>(null);
  const [noteSteps, setNoteSteps] = useState<string[]>([]);
  const [newNoteStep, setNewNoteStep] = useState('');
  const [selectedReminders, setSelectedReminders] = useState<Set<number>>(new Set());
  const [editingNoteStepIndex, setEditingNoteStepIndex] = useState<number | null>(null);
  const [links, setLinks] = useState<{ name: string, url: string }[]>([]);
  const [newLinkName, setNewLinkName] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);

  const images1 = [
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/1-CHAIN-CH.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/1-CHAIN-CH.svg",  
      description: 'CHAIN-CH' 
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/2-SLIP%20STITCH-SL%20ST.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/2-SLIP%20STITCH-SL%20ST.svg", 
      description: 'SLIP STITCH-SL ST'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/3-SINGLE%20CROCHETA-SC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/3-SINGLE%20CROCHETA-SC.svg",
      description: 'SINGLE CROCHETA-SC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/4-SINGLE%20CROCHETB-SC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/4-SINGLE%20CROCHETB-SC.svg",
      description: 'SINGLE CROCHETB-SC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/5-HALFDOUBLE-HDC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/5-HALFDOUBLE-HDC.svg",
      description: 'HALFDOUBLE-HDC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/6-DOUBLE-DC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/6-DOUBLE-DC.svg",
      description: 'DOUBLE-DC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/10-SINGLE%20CROCHET%203%20TOGETHER-SC3TOG.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/10-SINGLE%20CROCHET%203%20TOGETHER-SC3TOG.svg",
      description: 'SINGLE CROCHET 3 TOGETHER'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/11-DOUBLE%20CROCHET%202%20TOGETHER-DC2TOG.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/11-DOUBLE%20CROCHET%202%20TOGETHER-DC2TOG.svg",
      description: 'DOUBLE CROCHET 2 TOGETHER'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/12-DOUBLE%20CROCHET%203%20TOGETHER-DC3TOG.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/12-DOUBLE%20CROCHET%203%20TOGETHER-DC3TOG.svg",
      description: 'DOUBLE CROCHET 3 TOGETHER'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/13-3%20DOUBLE%20CROCHET%20CLUSTER.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/13-3%20DOUBLE%20CROCHET%20CLUSTER.svg",
      description: '3 DOUBLE CROCHET CLUSTER'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/14-3%20HALF%20DOUBLE-CLUSTER-PUFF-BOBBLE.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/14-3%20HALF%20DOUBLE-CLUSTER-PUFF-BOBBLE.svg",
      description: '3 HALF DOUBLE-CLUSTER-PU'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/15-5%20DC%20POPCORN.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/15-5%20DC%20POPCORN.svg",
      description: '5 DC POPCORN'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/16-5%20DC%20SHELL.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/16-5%20DC%20SHELL.svg",
      description: '5 DC SHELL'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/17-CH3-PICOT.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/17-CH3-PICOT.svg",
      description: 'CH3-PICOT'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/18-FRONTPOSTDC-FPDC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/18-FRONTPOSTDC-FPDC.svg",
      description: 'FRONTPOSTDC-FPDC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/19-BACKPOSTDC-BPDC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/19-BACKPOSTDC-BPDC.svg",
      description: 'BACKPOSTDC-BPDC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/20-BACK%20LOOP%20ONLY.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/20-BACK%20LOOP%20ONLY.svg",
      description: 'BACK LOOP ONLY'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/21-FRONT%20LOOP%20ONLY.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/21-FRONT%20LOOP%20ONLY.svg",
      description: 'FRONT LOOP ONLY'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/7-TREBLE-TC.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/7-TREBLE-TC.svg",
      description: 'TREBLE-TC'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/8-DOUBLETREBLE-DTR.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/8-DOUBLETREBLE-DTR.svg",
      description: 'DOUBLETREBLE-DTR'
    },
    { 
      url: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/9-SINGLE%20CROCHET%202%20TOGETHER-SC2TOG.svg", 
      thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imageswhite/main/9-SINGLE%20CROCHET%202%20TOGETHER-SC2TOG.svg",
      description: 'SINGLE CROCHET 2 TOGETHER'
    }
  ];
  

  const images = [
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/1-CHAIN-CH.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/1-CHAIN-CH.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/2-SLIP%20STITCH-SL%20ST.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/2-SLIP%20STITCH-SL%20ST.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/3-SINGLE%20CROCHETA-SC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/3-SINGLE%20CROCHETA-SC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/4-SINGLE%20CROCHETB-SC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/4-SINGLE%20CROCHETB-SC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/5-HALFDOUBLE-HDC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/5-HALFDOUBLE-HDC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/6-DOUBLE-DC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/6-DOUBLE-DC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/10-SINGLE%20CROCHET%203%20TOGETHER-SC3TOG.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/10-SINGLE%20CROCHET%203%20TOGETHER-SC3TOG.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/11-DOUBLE%20CROCHET%202%20TOGETHER-DC2TOG.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/11-DOUBLE%20CROCHET%202%20TOGETHER-DC2TOG.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/12-DOUBLE%20CROCHET%203%20TOGETHER-DC3TOG.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/12-DOUBLE%20CROCHET%203%20TOGETHER-DC3TOG.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/13-3%20DOUBLE%20CROCHET%20CLUSTER.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/13-3%20DOUBLE%20CROCHET%20CLUSTER.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/14-3%20HALF%20DOUBLE-CLUSTER-PUFF-BOBBLE.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/14-3%20HALF%20DOUBLE-CLUSTER-PUFF-BOBBLE.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/15-5%20DC%20POPCORN.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/15-5%20DC%20POPCORN.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/16-5%20DC%20SHELL.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/16-5%20DC%20SHELL.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/17-Ch4-PICOT.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/17-Ch4-PICOT.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/18-FRONTPOSTDC-FPDC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/18-FRONTPOSTDC-FPDC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/19-BACKPOSTDC-BPDC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/19-BACKPOSTDC-BPDC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/20-BACK%20LOOP%20ONLY.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/20-BACK%20LOOP%20ONLY.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/21-FRONT%20LOOP%20ONLY.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/21-FRONT%20LOOP%20ONLY.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/7-TREBLE-TC.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/7-TREBLE-TC.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/8-DOUBLETREBLE-DTR.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/8-DOUBLETREBLE-DTR.svg" },
    { url: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/9-SINGLE%20CROCHET%202%20TOGETHER-SC2TOG.svg", thumbnailUrl: "https://raw.githubusercontent.com/shinjini14/imagesblack/main/9-SINGLE%20CROCHET%202%20TOGETHER-SC2TOG.svg"},
    

  ];


  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('links') || '[]');
    if (storedLinks) {
      setLinks(storedLinks);
    }
  }, []);

  const saveLinksToLocalStorage = (updatedLinks) => {
    localStorage.setItem('links', JSON.stringify(updatedLinks));
  };

  const addNote = () => {
    const newNote = { id: Date.now(), title: patternName, skillLevel: '', hooks: [], otherTools: [], yarnTypes: [], noteSteps: [] };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const viewNote = (note: any) => {
    setSelectedNote(note);
    setPatternName(note.title);
    setSkillLevel(note.skillLevel);
    setHooks(note.hooks);
    setOtherTools(note.otherTools);
    setYarnTypes(note.yarnTypes);
    setNoteSteps(note.noteSteps);
    setActiveTab('Note Details');
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const goBack = () => {
    setSelectedNote(null);
    setActiveTab('Pattern Notes');
  };

  const renumberNoteSteps = (noteSteps: string[]) => {
    return noteSteps.map((step, index) => `Row ${index + 1}: ${step.split(': ')[1] || step}`);
  };

  const saveChanges = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title: patternName, skillLevel, hooks, otherTools, yarnTypes, noteSteps }
          : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const handleImageClick = async (image1: { url: string; thumbnailUrl: string }) => {
    try {
      const result = await upload({
        type: "IMAGE",
        mimeType: "image/svg+xml",
        url: image1.url,
        thumbnailUrl: image1.thumbnailUrl,
      });

      await addNativeElement({
        type: "IMAGE",
        ref: result.ref,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addSelectedToCanva = async () => {
    if (typeof addNativeElement === 'function') {
      const noteIndex = notes.findIndex(note => note.id === selectedNote.id);
      if (noteIndex !== -1) {
        const currentReminders = notes[noteIndex].noteSteps;

        for (const index of selectedReminders) {
          const reminder = currentReminders[index];
          await addNativeElement({
            type: "TEXT",
            children: [reminder.toString()],
          });
        }
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    const newSelectedReminders = new Set(selectedReminders);
    if (newSelectedReminders.has(index)) {
      newSelectedReminders.delete(index);
    } else {
      newSelectedReminders.add(index);
    }
    setSelectedReminders(newSelectedReminders);
  };

  const handleHookChange = (value: string) => setHook(value);
  const handleOtherToolChange = (value: string) => setOtherTool(value);
  const handleYarnTypeChange = (value: string) => setYarnType(value);
  const handleNoteStepChange = (value: string) => setNewNoteStep(value);

  const addHook = () => {
    if (editingHookIndex !== null) {
      const updatedHooks = hooks.map((h, i) => (i === editingHookIndex ? hook : h));
      setHooks(updatedHooks);
      setEditingHookIndex(null);
    } else {
      setHooks([...hooks, hook]);
    }
    setHook('');
  };

  const editHook = (index: number) => {
    setHook(hooks[index]);
    setEditingHookIndex(index);
  };

  const removeHook = (index: number) => {
    const updatedHooks = hooks.filter((_, i) => i !== index);
    setHooks(updatedHooks);
  };

  const addOtherTool = () => {
    if (editingToolIndex !== null) {
      const updatedTools = otherTools.map((t, i) => (i === editingToolIndex ? otherTool : t));
      setOtherTools(updatedTools);
      setEditingToolIndex(null);
    } else {
      setOtherTools([...otherTools, otherTool]);
    }
    setOtherTool('');
  };

  const editOtherTool = (index: number) => {
    setOtherTool(otherTools[index]);
    setEditingToolIndex(index);
  };

  const removeOtherTool = (index: number) => {
    const updatedOtherTools = otherTools.filter((_, i) => i !== index);
    setOtherTools(updatedOtherTools);
  };

  const addYarnType = () => {
    if (editingYarnIndex !== null) {
      const updatedYarns = yarnTypes.map((y, i) => (i === editingYarnIndex ? yarnType : y));
      setYarnTypes(updatedYarns);
      setEditingYarnIndex(null);
    } else {
      setYarnTypes([...yarnTypes, yarnType]);
    }
    setYarnType('');
  };

  const editYarnType = (index: number) => {
    setYarnType(yarnTypes[index]);
    setEditingYarnIndex(index);
  };

  const removeYarnType = (index: number) => {
    const updatedYarnTypes = yarnTypes.filter((_, i) => i !== index);
    setYarnTypes(updatedYarnTypes);
  };

  const addNoteStep = () => {
    let updatedNoteSteps;
    if (editingNoteStepIndex !== null) {
      updatedNoteSteps = noteSteps.map((step, i) => (i === editingNoteStepIndex ? newNoteStep : step));
      setEditingNoteStepIndex(null);
    } else {
      updatedNoteSteps = [...noteSteps, newNoteStep];
    }
    updatedNoteSteps = renumberNoteSteps(updatedNoteSteps);
    setNoteSteps(updatedNoteSteps);
    setNewNoteStep('');
  };

  const editNoteStep = (index: number) => {
    setNewNoteStep(noteSteps[index]);
    setEditingNoteStepIndex(index);
  };

  const removeNoteStep = (index: number) => {
    const updatedNoteSteps = noteSteps.filter((_, i) => i !== index);
    const renumberedNoteSteps = renumberNoteSteps(updatedNoteSteps);
    setNoteSteps(renumberedNoteSteps);
  };

  const addLink = () => {
    const newLink = { name: newLinkName, url: newLinkUrl };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    saveLinksToLocalStorage(updatedLinks);
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    saveLinksToLocalStorage(updatedLinks);
  };

  const editLink = (index) => {
    const linkToEdit = links[index];
    setNewLinkName(linkToEdit.name);
    setNewLinkUrl(linkToEdit.url);
    removeLink(index);
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.tabHeader}>
        <div className={`${styles.tab} ${activeTab === 'Pattern Notes' || activeTab === 'Note Details' ? styles.active : ''}`} onClick={() => setActiveTab('Pattern Notes')}>Pattern Notes</div>
        <div className={`${styles.tab} ${activeTab === 'Symbol Library' ? styles.active : ''}`} onClick={() => setActiveTab('Symbol Library')}>Symbol Library</div>
        <div className={`${styles.tab} ${activeTab === 'Links' ? styles.active : ''}`} onClick={() => setActiveTab('Links')}>Links</div>
      </div>
      <div className={styles.content}>
        {activeTab === 'Pattern Notes' && (
          <div className={styles.notesList}>
            <TextInput value={patternName} onChange={(value) => setPatternName(value)} placeholder="Enter pattern name" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="primary" onClick={addNote}>Start New Pattern</Button>
            {notes.map(note => (
              <div key={note.id} className={styles.noteItem}>
                <div className={styles.noteTitle} onClick={() => viewNote(note)}>{note.title}</div>
                <Button variant="secondary" onClick={() => deleteNote(note.id)}>Delete</Button>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Note Details' && selectedNote && (
          <div className={styles.noteDetails}>
            <div className={styles.topButtons}>
              <Button variant="primary" onClick={goBack} >
              <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
            </div>
            <div className={styles.section}>
              <h4>Pattern Title</h4>
              <TextInput value={patternName} onChange={(value) => setPatternName(value)} placeholder="Enter pattern name" />
            </div>
            <div className={styles.section}>
              <h4>Skill Level</h4>
              <Select value={skillLevel} onChange={(value) => setSkillLevel(value)} options={[
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Easy', value: 'Easy' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Expert', value: 'Expert' },
              ]} />
            </div>
            <div className={styles.section}>
              <h4>Hooks</h4>
              <div className={styles.hookInputContainer}>
                <Select value={hook} onChange={(value) => setHook(value)} options={[
                  { label: '2.25 mm, B-1', value: '2.25 mm, B-1' },
                  { label: '2.50 mm', value: '2.50 mm' },
                  { label: '2.75 mm, C-2', value: '2.75 mm, C-2' },
                  { label: '3.125 mm, D', value: '3.125 mm, D' },
                  { label: '3.25 mm, D-3', value: '3.25 mm, D-3' },
                  { label: '3.50 mm, E-4', value: '3.50 mm, E-4' },
                  { label: '3.75 mm, F-5', value: '3.75 mm, F-5' },
                  { label: '4 mm, G-6', value: '4 mm, G-6' },
                  { label: '4.25 mm, G', value: '4.25 mm, G' },
                  { label: '4.50 mm', value: '4.50 mm' },
                  { label: '5 mm, H-8', value: '5 mm, H-8' },
                  { label: '5.25 mm, I', value: '5.25 mm, I' },
                  { label: '5.50 mm, I-9', value: '5.50 mm, I-9' },
                  { label: '5.75 mm, J', value: '5.75 mm, J' },
                  { label: '6 mm, J-10', value: '6 mm, J-10' },
                  { label: '6.50 mm, K-10 1/2', value: '6.50 mm, K-10 1/2' },
                  { label: '7 mm', value: '7 mm' },
                  { label: '8 mm, L-11', value: '8 mm, L-11' },
                  { label: '9 mm, M/N-13', value: '9 mm, M/N-13' },
                  { label: '10 mm, N/P-15', value: '10 mm, N/P-15' },
                  { label: '11.50 mm, P-16', value: '11.50 mm, P-16' },
                  { label: '12 mm', value: '12 mm' },
                  { label: '15 mm, P/Q', value: '15 mm, P/Q' },
                  { label: '15.75 mm, Q', value: '15.75 mm, Q' },
                  { label: '16 mm, Q', value: '16 mm, Q' },
                  { label: '19 mm, S', value: '19 mm, S' },
                  { label: '25 mm, T/U/X', value: '25 mm, T/U/X' },
                  { label: '30 mm, T/X', value: '30 mm, T/X' }
                ]} />
                <Button variant="primary" onClick={addHook}  >
                <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              {hooks.map((hook, index) => (
                <div key={index} className={styles.hookItem}>
                  {hook}
                  <div className={styles.actions}>
                    <div className={styles.iconButton} onClick={() => editHook(index)}><FontAwesomeIcon icon={faPen} /></div>
                    <div className={styles.iconButton} onClick={() => removeHook(index)}><FontAwesomeIcon icon={faTimes} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.section}>
              <h4>Other Tools</h4>
              <TextInput value={otherTool} onChange={(value) => setOtherTool(value)} placeholder="Enter other tool" onKeyDown={(e) => { if (e.key === 'Enter') addOtherTool(); }} />
              <div className={styles.footnote}>Press Enter to create</div>
              {otherTools.map((tool, index) => (
                <div key={index} className={styles.toolItem}>
                  {tool}
                  <div className={styles.actions}>
                    <div className={styles.iconButton} onClick={() => editOtherTool(index)}><FontAwesomeIcon icon={faPen} /></div>
                    <div className={styles.iconButton} onClick={() => removeOtherTool(index)}><FontAwesomeIcon icon={faTimes} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.section}>
              <h4>Yarn Types</h4>
              <TextInput value={yarnType} onChange={(value) => setYarnType(value)} placeholder="Enter yarn type" onKeyDown={(e) => { if (e.key === 'Enter') addYarnType(); }} />
              <div className={styles.footnote}>Press Enter to create</div>
              {yarnTypes.map((yarn, index) => (
                <div key={index} className={styles.yarnItem}>
                  {yarn}
                  <div className={styles.actions}>
                    <div className={styles.iconButton} onClick={() => editYarnType(index)}><FontAwesomeIcon icon={faPen} /></div>
                    <div className={styles.iconButton} onClick={() => removeYarnType(index)}><FontAwesomeIcon icon={faTimes} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="list-section">
              <h4>Row Notes</h4>
              <div className={styles.footnote}>Rows will populate with row numbers and can be edited and reordered later</div>
              <TextInput placeholder="Add Row Notes" value={newNoteStep} onChange={(value) => handleNoteStepChange(value)} onKeyDown={(e) => { if (e.key === 'Enter') addNoteStep(); }} />
              <div className={styles.footnote}>Press Enter to create</div>
              <DragDropContext onDragEnd={ondragend}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {noteSteps.map((step, index) => (
                        <Draggable key={index} draggableId={`${index}`} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className={styles.stepItem}>
                                <Checkbox checked={selectedReminders.has(index)} onChange={() => handleCheckboxChange(index)} />
                                <div className={styles.noteText}>{step}</div>
                                <div className={styles.actions}>
                                  <div className={styles.iconButton} onClick={() => editNoteStep(index)}><FontAwesomeIcon icon={faPen} /></div>
                                  <div className={styles.iconButton} onClick={() => removeNoteStep(index)}><FontAwesomeIcon icon={faTimes} /></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className={styles.buttonGroup}>
                <Button variant="primary" onClick={addSelectedToCanva}>Add Selected Rows to Pattern</Button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Symbol Library" && (
          <div className={styles.imageContainer}>
            {images1.map((image, index) => (
              <div
                key={index}
                className={styles.imageWrapper}
                data-tooltip={image.description}
                onClick={() => handleImageClick(images[index])}
              >
                <img src={image.thumbnailUrl} alt={`Thumbnail ${index + 1}`} className={styles.thumbnail} />
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Links' && (
          <div className={styles.linksContainer}>
            <Rows spacing="0.5u">
              <div><p className="link"><h4>YOUR LINKS:</h4></p></div>
              <div>
                <FormField
                  label="Link Name"
                  control={(props) => (
                    <TextInput
                      value={newLinkName}
                      onChange={(value) => setNewLinkName(value)}
                      placeholder="Enter link name..."
                    />
                  )}
                />
              </div>
              <div>
                <FormField
                  label="Link URL"
                  control={(props) => (
                    <TextInput
                      value={newLinkUrl}
                      onChange={(value) => setNewLinkUrl(value)}
                      placeholder="Enter link URL..."
                    />
                  )}
                />
              </div>
              <Button variant="primary" onClick={addLink}>Add New Link</Button>
              <div className={styles.linksContainer}>
                {links.map((link, index) => (
                  <div key={index} className={styles.linkBox}>
                    <div className={styles.linkInfo}>
                      <div className={styles.linkName}>{link.name}</div>
                      <div className={styles.linkUrl}>{link.url}</div>
                    </div>
                    <div className={styles.actions}>
                      <div className={styles.iconButton} onClick={() => editLink(index)}><FontAwesomeIcon icon={faPen} /></div>
                      <div className={styles.iconButton} onClick={() => removeLink(index)}><FontAwesomeIcon icon={faTimes} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </Rows>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
