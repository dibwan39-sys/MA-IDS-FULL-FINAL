
from scapy.all import sniff, IP
import json, asyncio, websockets

WS = "ws://localhost:8080"

async def send(pkt):
    async with websockets.connect(WS) as ws:
        await ws.send(json.dumps(pkt))

def on_packet(p):
    if IP in p:
        pkt = {"src": p[IP].src, "dst": p[IP].dst, "len": len(p)}
        asyncio.run(send(pkt))

sniff(prn=on_packet, store=False)
